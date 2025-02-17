import { Body, Controller, Post } from '@nestjs/common';
import { STRIPE_URL } from '../const';
import { StripeEventService } from './event.service';

@Controller(`${STRIPE_URL}/event`)
export class StripeEventController {
  constructor(private readonly stripeEventService: StripeEventService) {}

  @Post()
  async checkEvent(@Body() body: any) {
    return this.stripeEventService.checkEvent(body);
  }
}
