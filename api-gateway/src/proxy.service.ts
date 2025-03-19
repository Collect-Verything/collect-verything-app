import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ProxyService {
  async processRequest(req: Request) {
    console.log(req);
    return 'Proxy service';
  }
}
