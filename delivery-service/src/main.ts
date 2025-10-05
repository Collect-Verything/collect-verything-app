import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvValue } from '../env-config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    // origin: [`http://api-gateway:2999`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://broker-service'],
      queue: 'delivery-queue',
      queueOptions: { durable: true },
      prefetchCount: 1,
      noAck: false,
    },
  });

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  checkEnvValue();
  await app.startAllMicroservices();
  await app.listen(3005);
}

bootstrap();

// TODO :
//     [ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
