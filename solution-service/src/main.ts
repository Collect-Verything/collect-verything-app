import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {configEnv} from "../env-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configEnv.SOLUTION_PORT_API);

}
bootstrap();
