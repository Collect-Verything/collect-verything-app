import { Body, Controller, Get, NotFoundException, Param, Patch } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller('delivery')
export class ShipmentController {
  constructor(
    private readonly shipmentService: ShipmentService,
    private prisma: PrismaService
  ) {}

  @EventPattern('delivery.create')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handledelivery(@Payload() messageReceived: any, @Ctx() ctx: RmqContext) {
    const ch = ctx.getChannelRef();
    const msg = ctx.getMessage();

    try {
      await this.shipmentService.persistDelivery(messageReceived);
      ch.ack(msg, false, true);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(+id);
  }

  // TODO : Refacto test code un service methode
  @Patch(':id')
  async update(
    @Param('id') deliveryId: string,
    @Body() updateShipmentDto: { productId: number; stockDelivered: number }
  ) {
    const delivery = await this.shipmentService.findOne(+deliveryId);
    const { productId, stockDelivered } = updateShipmentDto;
    const productToUpdate = delivery.products.find((product) => product.id === productId);

    if (!productToUpdate) {
      throw new NotFoundException('Produit non trouvé dans cette livraison');
    }

    const newDelivered = productToUpdate.delivered + stockDelivered;
    await this.prisma.product.update({
      where: { id: productId },
      data: { delivered: newDelivered },
    });

    const allProductsDelivered = delivery.products.every((product) => {
      if (product.id === productId) {
        return newDelivered >= product.quantity;
      } else {
        return product.delivered >= product.quantity;
      }
    });

    if (allProductsDelivered) {
      await this.prisma.delivery.update({
        where: { id: +deliveryId },
        data: { delivery_status: 'Done' },
      });
    }

    return { success: true, message: 'Mise à jour effectuée' };
  }
}
