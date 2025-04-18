import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
import { checkEnvValue, configEnv } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);

  app.enableCors({
    // TODO : Define origine from front
    origin: '*',
    // origin: [`http://${configEnv.DOMAIN}:${configEnv.FRONT_PORT}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  checkEnvValue()
  await app.listen(configEnv.API_GATEWAY_PORT);
}

bootstrap();
