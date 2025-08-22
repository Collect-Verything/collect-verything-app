import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from '../prisma/prisma.service';

// TODO : Persister une livraison venant de rabbit mq et qui vient pour le moment de PostMan mais devrait etre trigger par un webhook

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
    return this.prisma.delivery.findUnique({ where: { id }, include: { products: true } });
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
