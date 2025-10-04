import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { configEnv } from '../../env-config';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MessageEntity } from '../commmon/types';

@Controller(`${configEnv.CONFIG_URL}/sub`)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @EventPattern('config.sub.updated')
  async handleConfigUpdated(@Payload() data: MessageEntity, @Ctx() ctx: RmqContext) {
    const ch = ctx.getChannelRef();
    const msg = ctx.getMessage();

    try {
      await this.subscriptionService.createWithConfiguration(data);
      ch.ack(msg);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/recover/:user_stripe_id')
  recoverInactiveSubByUserId(@Param('user_stripe_id') user_stripe_id: string) {
    return this.subscriptionService.recoverInactiveSubByUserId(user_stripe_id);
  }

  @Get(':user_stripe_id')
  findAllByUserId(@Param('user_stripe_id') user_stripe_id: string) {
    console.log(user_stripe_id);
    return this.subscriptionService.findAllByUserId(user_stripe_id);
  }

  @Post(':sub_stripe_id')
  cancelSubById(@Param('sub_stripe_id') sub_stripe_id: string) {
    return this.subscriptionService.cancelSubById(sub_stripe_id);
  }

  @Patch('configure/:sub_id/:is_active')
  configuredSubById(@Param('sub_id') sub_id: string, @Param('is_active') is_active: string) {
    const isActiveBoolean = is_active === 'true';
    return this.subscriptionService.configureSubById(sub_id, isActiveBoolean);
  }

  @Patch('publish/:sub_id/:is_publish')
  publishWebSiteById(@Param('sub_id') sub_id: string, @Param('is_publish') is_publish: string) {
    const isPublishBoolean = is_publish === 'true';
    return this.subscriptionService.publishWebSite(sub_id, isPublishBoolean);
  }
}
