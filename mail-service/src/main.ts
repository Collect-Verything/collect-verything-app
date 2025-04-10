import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors, mail service ne communique que par amqp

  await app.listen(3000);
}
bootstrap();
/*
TODO :
[ ] Mise a jour des root dans Api Gateway


[ ] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root. (...)
----[ ] Installation
----[ ] Base de donnée :
--------[ ] Generer schema
--------[ ] Seed
----[ ] Run


[ ] Configuration du fichier main du nouveau service
----[ ] Ajout du nouveau port dans le .env du root et
----[ ] npm i dotenv dans le service concerné
----[ ] Creer fichier env-config.ts pour la recuperation des .env du root (suivre pattern present dans les autres service)
----[ ] Mettre à jour les .env front et root avec l'rl service et port du nouveau service


[ ] Mettre a jour les fichier en rapport avec Docker (suivre pattern existant)
----[ ] Dockerfile
----[ ] compose.yaml
----[ ] start.sh
[ ] Creer les tests unitaires
[ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier. (suivre le pattern)
[ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
*/