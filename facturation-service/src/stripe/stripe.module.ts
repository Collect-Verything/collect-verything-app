import { Module } from '@nestjs/common';
import { StripeProductController } from './product/product.controller';
import { StripeProductService } from './product/product.service';

@Module({
  controllers: [StripeProductController],
  providers: [StripeProductService],
})
export class StripeModule {}
