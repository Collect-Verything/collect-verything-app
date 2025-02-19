import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('event')
  async eventGet(@Body() eventObject: any) {
    console.log(eventObject);
  }
}
