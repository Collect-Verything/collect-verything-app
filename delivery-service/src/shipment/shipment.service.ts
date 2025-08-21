import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  create(createShipmentDto: CreateShipmentDto) {
    return 'This action adds a new shipment';
  }

  persistDelivery(message: any) {
    console.log(message);
    console.log('🚚  Received on queue : --[ SERVICE - DELIVERY ]--');
    //   SI point relais delivered === quantity
    //   SI shop delivered === 0
    //   SI Service do nothing
  }

  findAll() {
    return this.prisma.delivery.findMany({ include: { user: true, products: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} shipment`;
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
