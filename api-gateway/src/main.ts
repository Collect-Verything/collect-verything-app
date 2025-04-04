import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
import { configEnv } from '../env-config';

// TODO : L'api gateway joue le role de passe plat pour le moment, il pour vocation de gerer les request aller retour present depuis le front

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);

  app.enableCors({
    origin: [`http://${configEnv.DOMAIN}:${configEnv.FRONT_PORT}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(configEnv.API_GATEWAY_PORT);
}

bootstrap();
