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
        const urlCheckToken: string = `http://${configEnv.DOMAIN}:${configEnv.AUTH_PORT}/${configEnv.AUTH_URL_AUTH}/validate-token`;
        const responseCheckToken = await axios.post(
          urlCheckToken,
          {},
          {
            headers: { Authorization: req.headers.authorization },
          },
        );

        if (responseCheckToken.status === 200) {
          // EXECUTE REQUEST
          const res = await axios({
            method: req.method.toLowerCase(),
            url: `http://${configEnv.DOMAIN}:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
            data: req.body,
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              Expires: '0',
              ...req.headers,
            },
          });

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
