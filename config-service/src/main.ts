import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnv } from '../env-config';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    // origin: [`http://${configEnv.DOMAIN}:${configEnv.DOMAIN}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(configEnv.CONFIG_PORT);
}

bootstrap();
