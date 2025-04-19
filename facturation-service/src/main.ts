import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvValue, configEnv } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    // origin: [`http://${configEnv.DOMAIN}:${configEnv.API_GATEWAY_PORT}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  checkEnvValue();

  await app.listen(configEnv.FACTURATION_PORT);
}

bootstrap();
