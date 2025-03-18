import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StripeModule, PrismaModule],
})
export class AppModule {}
