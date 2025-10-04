import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);

  app.enableCors({
    origin: '*',
    // origin: [`http://localhost:3000`,"http://<ip-prod:80>"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen('2999');
}

bootstrap();
