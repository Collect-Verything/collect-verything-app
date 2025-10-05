import { Body, Controller, Post } from '@nestjs/common';
import { StripeEventService } from './event.service';

@Controller(`stripe/event`)
export class StripeEventController {
  constructor(private readonly stripeEventService: StripeEventService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkEvent(@Body() body: any) {
    return this.stripeEventService.checkEvent(body);
  }
}
