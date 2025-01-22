import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { StripeProductController } from './stripe/product/product.controller';
import { StripeProductService } from './stripe/product/product.service';

@Module({
  imports: [StripeModule],
  controllers: [AppController, StripeProductController],
  providers: [AppService, StripeProductService],
})
export class AppModule {}
