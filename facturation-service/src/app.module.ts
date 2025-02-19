import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StripeModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
