import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://broker-service'],
      queue: 'forgot-password',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  // app.enableCors, mail service ne communique que par amqp
  await app.listen(3000);
}

bootstrap();
/*
TODO :


[ ] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root. (...)
----[ ] Installation
----[ ] Base de donnée :
--------[ ] Generer schema
--------[ ] Seed
----[ ] Run




[ ] Creer les tests unitaires
[ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier. (suivre le pattern)
[ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
*/