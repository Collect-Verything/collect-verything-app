import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://broker-service'],
      queue: 'mail-queue',
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();

/*
TODO :
[ ] Creer les tests unitaires
[ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
*/