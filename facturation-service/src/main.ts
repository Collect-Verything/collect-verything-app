import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvValue } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    // origin: [`http://api-gateway:2999`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  checkEnvValue();

  await app.listen(3003);
}

bootstrap();
