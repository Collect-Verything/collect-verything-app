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
import { StripeInvoiceController } from './invoice/invoice.controller';
import { StripeInvoiceService } from './invoice/invoice.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [
    StripeProductController,
    StripeCustomerController,
    StripeCheckoutController,
    StripeEventController,
    StripeInvoiceController,
  ],
  providers: [
    StripeProductService,
    StripeCustomerService,
    StripeCheckoutService,
    StripeEventService,
    StripeInvoiceService,
  ],
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://broker-service`],
          queue: 'mail-queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'CONFIG_SUB_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://broker-service'],
          queue: 'config-sub-queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: 'DELIVERY_PRODUCT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://broker-service'],
          queue: 'delivery-queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
})
export class StripeModule {}
