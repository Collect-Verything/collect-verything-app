import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [SubscriptionModule, PrismaModule, ConfigurationModule],
})
export class AppModule {}
