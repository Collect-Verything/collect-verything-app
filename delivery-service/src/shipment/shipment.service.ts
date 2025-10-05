import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';
import { Message } from './entities/message.entity';
import { toDeliveryType } from './functions';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async persistDelivery(message: Message) {
    console.log('🚚  Received on queue : --[ SERVICE - DELIVERY ]--');
    const { owner, products, typeDelivery, email, name } = message;

    await this.prisma.$transaction(async (tx) => {
      const existing = await tx.user.findFirst({ where: { email } });

      const delivery = await tx.delivery.create({
        data: {
          delivery_status: DeliveryStatus.Pending,
          delivery_type: toDeliveryType(typeDelivery),
          info: 'Aucune info',
          user: existing ? { connect: { id: existing.id } } : { create: { owner, name, email } },
          products: {
            create: products.map((p) => ({
              name: p.productName,
              quantity: p.quantity,
              delivered: 0,
            })),
          },
        },
        include: { user: true, products: true },
      });

      return delivery;
    });
  }

  findAll() {
    return this.prisma.delivery.findMany({ include: { user: true, products: true } });
  }

  findOne(id: number) {
    return this.prisma.delivery.findUnique({ where: { id }, include: { products: true } });
  }
}
