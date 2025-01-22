import { Module } from '@nestjs/common';
import { StripeProductController } from './product/product.controller';
import { StripeProductService } from './product/product.service';
import { StripeCustomerController } from './customer/customer.controller';
import { StripeCustomerService } from './customer/customer.service';

@Module({
  controllers: [StripeProductController, StripeCustomerController],
  providers: [StripeProductService, StripeCustomerService],
})
export class StripeModule {}
