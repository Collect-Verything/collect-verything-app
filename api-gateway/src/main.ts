import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
import { configEnv } from '../env-config';

// TODO :
// [x] Generer un nouveau service avec la commande :  npx @nestjs/cli new new-service
// [x] Afficher les dossier caché dans le finder et aller dans le dossier du nouveai service puis supprimer le dossier caché .git
// [x] Dans le git dif retablif le fichier  present /.idea/vsc.xml (pour retablir le repo originel
// [x] Supprimer les fichier  service et controller app. et supprimer egalement ces elements present dans le main module (generé a la creation)
// [ ] Generer les premiere ressource avec la commande
// [x] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root.
// ----[x] Installation
// ----[] x Base de donnée :
// --------[] x Generer schema
// --------[] x Seed
// ----[x] Run
// [ ] Configuration du fichier main du nouveau service
// ----[ ] Ajout du nouveau port dans le .env du root et
// ----[ ] Creer fichier env-config.ts (suivre pattern present dans les autres service)
// ----[ ] npm i dotenv dans el service concerné
// [ ] Mettre a jour le document ReadeMe.md du root pour y ajouter la ligne concernant le nouveau service, suivre le pattern
// [ ] Mettre a jour les fichier en rapport avec Docker compose, file, start.sh
// ----[ ] Dockerfile
// ----[ ] compose.yaml
// ----[ ] start.sh
// [ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier, suivre le pattern.
// [ ] Mettre ce proccess au propre dans la documentation, servira de guide pas a pas pour les prochain service.

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);

  app.enableCors({
    origin: [`http://${configEnv.DOMAIN}:${configEnv.FRONT_PORT}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(configEnv.API_GATEWAY_PORT);
}

bootstrap();
