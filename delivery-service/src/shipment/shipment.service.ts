import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async persistDelivery(message: any) {
    console.log('🚚  Received on queue : --[ SERVICE - DELIVERY ]--');
    console.log(message);
    // TODO : Persister la delivery
  }

  findAll() {
    return this.prisma.delivery.findMany({ include: { user: true, products: true } });
  }

  findOne(id: number) {
    return this.prisma.delivery.findUnique({ where: { id }, include: { products: true } });
  }
}
