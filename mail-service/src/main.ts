import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { checkEnvValue } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://broker-service`],
      queue: 'mail-queue',
      queueOptions: { durable: false },
    },
  });

  checkEnvValue();

  await app.startAllMicroservices();
}

bootstrap();
