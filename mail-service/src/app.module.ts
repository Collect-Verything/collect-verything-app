import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [AuthModule, DeliveryModule],
})
export class AppModule {}
