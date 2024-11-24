import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {configEnv} from "../env-config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
      .setTitle('Collect & Verithing - Product')
      .setDescription('Manage products and services')
      .setVersion('0.1')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configEnv.PRODUCT_PORT_API);
}
bootstrap();
