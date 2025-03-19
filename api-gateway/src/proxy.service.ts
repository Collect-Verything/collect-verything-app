import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

const freePath = ['login', 'register'];
const checkTokenPath = 'http://localhost:3001/auth/validate-token';

@Injectable()
export class ProxyService {
  async processRequest(req: Request) {
    // STRIPE EVENT

    // FREE ROOT
    if (
      req.url.split('/')[2] === 'auth' &&
      freePath.includes(req.url.split('/')[3])
    ) {
      const res = await axios[req.method.toLowerCase()](
        `http://localhost:${req.url.substring(1)}`,
        req.body,
      );
      return res.data;

      // PROTECTED ROOT
    } else {
      // CHECK TOKEN
      if (req.headers.authorization) {
        // CHECK TOKEN ON AUTH SERVICE
        const responseCheckToken = await axios.post(
          checkTokenPath,
          {},
          {
            headers: { Authorization: req.headers.authorization },
          },
        );

        if (responseCheckToken.status === 200) {
          // EXECUTE REQUEST
          const res = await axios[req.method.toLowerCase()](
            `http://localhost:${req.url.substring(1)}`,
            req.body,
          );
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
