import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import {configEnv} from "../env-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${configEnv.MESSAGE_BROKER_URL}`],
      queue: configEnv.EMAIL_QUEUE,
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservices();
}

bootstrap();

/*
TODO :
[ ] Creer les tests unitaires
[ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
*/