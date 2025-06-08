import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeliveryService } from './delivery.service';
import { DeliveryBrokeObject } from './entities/delivery.entity';

@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @EventPattern('delivery')
  handledelivery(@Payload() messageReceived: DeliveryBrokeObject) {
    console.log('📥 Received on queue : --[ DELIVERY ]--');
    this.deliveryService.sendDeliveryInformation(messageReceived);
  }
}
