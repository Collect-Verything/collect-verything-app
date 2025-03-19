import {All, Controller, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {ProxyService} from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  async checkRequest(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    // try {
    //   const response = await this.proxyService.processRequest(req);
    //   return res.status(response.status).send(response.data);
    // } catch (error) {
    //   console.error(error.message);
    //   return res.status(500).send(error.message);
    // }
  }
}