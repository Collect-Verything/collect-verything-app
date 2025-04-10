import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { QUEUE_NAME } from '../../users/const';

@Injectable()
export class MessageBrokerService {
  async sendMessage(password: string, queueName: QUEUE_NAME) {
    try {
      const connection = await amqp.connect('amqp://broker-service');
      const channel = await connection.createChannel();

      await channel.assertQueue(queueName, { durable: false });

      const message = {
        "pattern": "forgot-password",
        "data": password
      }

      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log('📤     Sent on queue : --[ ', queueName, ' ]--');

      setTimeout(() => {
        connection.close();
      }, 500);
    } catch (err) {
      console.error('Erreur lors de l’envoi du message à RabbitMQ :', err);
    }
  }
}
