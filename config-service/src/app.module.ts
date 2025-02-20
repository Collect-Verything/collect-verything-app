import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SubscriptionModule, PrismaModule],
})
export class AppModule {}
