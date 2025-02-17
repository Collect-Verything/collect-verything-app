import { Module } from '@nestjs/common';
import { StripeProductController } from './product/product.controller';
import { StripeProductService } from './product/product.service';
import { StripeCustomerController } from './customer/customer.controller';
import { StripeCustomerService } from './customer/customer.service';
import { StripeCheckoutService } from './checkout/checkout.service';
import { StripeCheckoutController } from './checkout/checkout.controller';
import { StripeEventController } from './event/event.controller';
import { StripeEventService } from './event/event.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [
    StripeProductController,
    StripeCustomerController,
    StripeCheckoutController,
    StripeEventController,
  ],
  providers: [
    StripeProductService,
    StripeCustomerService,
    StripeCheckoutService,
    StripeEventService,
  ],
  imports: [PrismaModule],
})
export class StripeModule {}
