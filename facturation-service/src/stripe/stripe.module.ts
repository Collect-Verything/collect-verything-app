import { Module } from '@nestjs/common';
import { StripeProductController } from './product/product.controller';
import { StripeProductService } from './product/product.service';
import { StripeCustomerController } from './customer/customer.controller';
import { StripeCustomerService } from './customer/customer.service';
import { StripeCheckoutService } from './checkout/checkout.service';
import { StripeCheckoutController } from './checkout/checkout.controller';

@Module({
  controllers: [
    StripeProductController,
    StripeCustomerController,
    StripeCheckoutController,
  ],
  providers: [
    StripeProductService,
    StripeCustomerService,
    StripeCheckoutService,
  ],
})
export class StripeModule {}
