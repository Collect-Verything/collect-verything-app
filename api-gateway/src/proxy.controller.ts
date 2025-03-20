import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  async checkRequest(@Req() req: Request) {
    return this.proxyService.processRequest(req);
  }
}
