import { Module } from '@nestjs/common';
import { ShipmentModule } from './shipment/shipment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ShipmentModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
