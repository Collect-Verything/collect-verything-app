import {Controller, Get, Param} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':user_stripe_id')
  findAllByUserId(@Param('user_stripe_id') user_stripe_id: string) {
    return this.subscriptionService.findAllByUserId(user_stripe_id);
  }
}
