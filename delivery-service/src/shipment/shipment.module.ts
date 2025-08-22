import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService],
  imports: [PrismaModule],
})
export class ShipmentModule {}
