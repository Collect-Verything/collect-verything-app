import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { checkFreePath } from '../common/tool';
import { portByPath } from '../common/const';
import { configEnv } from '../env-config';

@Injectable()
export class ProxyService {
  async processRequest(req: Request) {
    // STRIPE EVENT

    // FREE ROOT
    if (checkFreePath(req.url)) {
      // const freePath = `http://${getDomain(req.url.split('/')[1])}:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`;

      const res = await axios[req.method.toLowerCase()](
        `http://auth-service:3001/auth/login`,
        req.body,
      );
      return res.data;

      // PROTECTED ROOT
    } else {
      // CHECK TOKEN

      if (req.headers.authorization) {
        // CHECK TOKEN ON AUTH SERVICE
        const urlCheckToken: string = `http://auth-service:${configEnv.AUTH_PORT}/${configEnv.AUTH_URL_AUTH}/validate-token`;
        console.log('>1 ____REQUETE AUTH CHECK EFFECTUE SUR ___');
        console.log(urlCheckToken);
        const responseCheckToken = await axios.post(
          urlCheckToken,
          {},
          {
            headers: { Authorization: req.headers.authorization },
          },
        );

        console.log('2 ____REPONSE CHECK AUTH ___');
        console.log(responseCheckToken.status);

        if (responseCheckToken.status === 200) {
          // EXECUTE REQUEST
          console.log('3 ____RESPONSE VALIDATION TOKEN AUTH___');
          console.log(responseCheckToken.status);

          console.log('4 ____URL REQUEST VERS SERVICE ___');
          console.log(
            `http://${configEnv.DOMAIN}:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
          );

          console.log(req.url);
          console.log(req.url.split('/')[0]);
          console.log(req.url.split('/')[1]);

          const res = await axios({
            method: req.method.toLowerCase(),
            // url: `http://${configEnv.DOMAIN}:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
            // Creer une methode  pour mettre en domaine le service docker basé sur le req.url.split de 1, creer un dictionnaire
            url: `http://auth-service:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
            data: req.body,
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              Expires: '0',
              ...req.headers,
            },
          });
          console.log('5 ____REPONSE DU SERVICE CIBLE___');
          console.log('>--------  Status : ');
          console.log(res.status);
          console.log('>--------  Data : ');
          console.log(res.data);
          return res.data;
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
