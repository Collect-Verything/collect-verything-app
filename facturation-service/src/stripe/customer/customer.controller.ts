import { Body, Controller, Post } from '@nestjs/common';
import { StripeCustomerService } from './customer.service';
import { StripeUserEntity } from './customer.entity';
import { configEnv } from '../../../env-config';

@Controller(`${configEnv.FACTURATION_URL}/customer`)
export class StripeCustomerController {
  constructor(private readonly stripeCustomerService: StripeCustomerService) {}

  @Post('create')
  async customerCreate(@Body() cleanedRegisterForm: StripeUserEntity) {
    return this.stripeCustomerService.create(cleanedRegisterForm);
  }
}
