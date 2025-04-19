import { Body, Controller, Param, Post } from '@nestjs/common';
import { StripeCheckoutService } from './checkout.service';
import { StripeProductEntity } from '../product/product.entity';
import { configEnv } from '../../../env-config';

@Controller(`${configEnv.FACTURATION_URL}/checkout`)
export class StripeCheckoutController {
  constructor(private readonly stripeCheckoutService: StripeCheckoutService) {}

  @Post('create/:id_stripe')
  async createCheckoutSession(
    @Param('id_stripe') id_stripe: string,
    @Body() basket: StripeProductEntity[]
  ) {
    return this.stripeCheckoutService.createCheckoutSession(id_stripe, basket);
  }
}
