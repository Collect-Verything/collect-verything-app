import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvValue } from '../env-config';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://broker-service'],
      queue: 'config-sub-queue',
      queueOptions: { durable: true },
      prefetchCount: 1,
    },
  });

  app.enableCors({
    origin: '*',
    // origin: [`http://api-gateway:2999`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  checkEnvValue();

  await app.startAllMicroservices();
  await app.listen(3004);
}

bootstrap();
