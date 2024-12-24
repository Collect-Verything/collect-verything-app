import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnv } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`http://localhost:${configEnv.FRONT_PORT_CLIENT}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(configEnv.FACTURATION_PORT_API);

}
bootstrap();
