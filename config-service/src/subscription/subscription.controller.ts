import { Controller, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CONFIG_URL } from '../const';

@Controller(`${CONFIG_URL}/sub`)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('/recover/:user_stripe_id')
  recoverInactiveSubByUserId(@Param('user_stripe_id') user_stripe_id: string) {
    return this.subscriptionService.recoverInactiveSubByUserId(user_stripe_id);
  }

  @Get(':user_stripe_id')
  findAllByUserId(@Param('user_stripe_id') user_stripe_id: string) {
    return this.subscriptionService.findAllByUserId(user_stripe_id);
  }

  @Post(':sub_stripe_id')
  cancelSubById(@Param('sub_stripe_id') sub_stripe_id: string) {
    return this.subscriptionService.cancelSubById(sub_stripe_id);
  }
}
