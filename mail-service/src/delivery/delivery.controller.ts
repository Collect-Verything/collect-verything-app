import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeliveryService } from './delivery.service';
import { DeliveryBrokeObject } from './entities/delivery.entity';

@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @EventPattern('mail-delivery')
  handledelivery(@Payload() messageReceived: DeliveryBrokeObject) {
    console.log('📥 Received on queue : --[ MAIL - DELIVERY ]--');
    this.deliveryService.sendDeliveryInformation(messageReceived);
  }
}
