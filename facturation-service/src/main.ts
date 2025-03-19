import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnv } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // TODO : configEnv ne marche pas dockerisé
    origin: [`http://localhost:2999`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  await app.listen(configEnv.FACTURATION_PORT_API);

}
bootstrap();
