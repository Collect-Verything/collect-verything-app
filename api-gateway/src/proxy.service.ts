import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { checkFreePath } from '../common/tool';
import { portByPath } from '../common/const';

@Injectable()
export class ProxyService {
  async processRequest(req: Request) {
    // STRIPE EVENT

    // FREE ROOT
    if (checkFreePath(req.url)) {
      const res = await axios[req.method.toLowerCase()](
        `http://localhost:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
        req.body,
      );
      return res.data;

      // PROTECTED ROOT
    } else {

      // CHECK TOKEN
      if (req.headers.authorization) {

        // CHECK TOKEN ON AUTH SERVICE
        const responseCheckToken = await axios.post(
          'http://localhost:3001/auth/validate-token',
          {},
          {
            headers: { Authorization: req.headers.authorization },
          },
        );

        if (responseCheckToken.status === 200) {
          
          // EXECUTE REQUEST
          const res = await axios({
            method: req.method.toLowerCase(),
            url: `http://localhost:${portByPath.get(req.url.split('/')[1])}/${req.url.substring(1)}`,
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
