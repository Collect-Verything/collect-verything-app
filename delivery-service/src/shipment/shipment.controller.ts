import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { configEnv } from '../../env-config';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller(configEnv.DELIVERY_URL)
export class ShipmentController {
  constructor(
    private readonly shipmentService: ShipmentService,
    private prisma: PrismaService
  ) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.create(createShipmentDto);
  }

  @EventPattern('service-delivery')
  handledelivery(@Payload() messageReceived: any) {
    this.shipmentService.persistDelivery(messageReceived);
  }

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(+id);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(+id);
  }
}
