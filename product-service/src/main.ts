import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {configEnv} from "../env-config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import {PrismaClientExceptionFilter} from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // TODO : configEnv ne marche pas dockerisé
    origin: [`http://localhost:${configEnv.FRONT_PORT_CLIENT}`,`http://localhost:3000`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
      .setTitle('Collect & Verything - Product')
      .setDescription('Manage products and services')
      .setVersion('0.1')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(configEnv.PRODUCT_PORT_API);
}
bootstrap();
