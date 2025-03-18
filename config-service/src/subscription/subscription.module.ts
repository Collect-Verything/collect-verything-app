import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigurationController } from '../configuration/configuration.controller';
import { ConfigurationService } from '../configuration/configuration.service';

@Module({
  controllers: [SubscriptionController, ConfigurationController],
  providers: [SubscriptionService, ConfigurationService],
  imports: [PrismaModule],
})
export class SubscriptionModule {}
