import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {configEnv} from "../env-config";

// TODO :
// [x] Generer un nouveau service avec la commande :  npx @nestjs/cli new new-service
// [x] Afficher les dossier caché dans le finder et aller dans le dossier du nouveai service puis supprimer le dossier caché .git
// [x] Dans le git dif retablif le fichier  present /.idea/vsc.xml (pour retablir le repo originel
// [x] Supprimer les fichier  service et controller app. et supprimer egalement ces elements present dans le main module (generé a la creation)
// [x] Generer les premiere ressource avec la commande
// [ ] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root.
// ----[x] Installation
// ----[ ] Base de donnée
// ----[x] Run
// [ ] Configuration du fichier main du nouveau service
// ----[x] Ajout du nouveau port dans le .env du root et
// ----[x] Creer fichier env-config.ts (suivre pattern present dans les autres service)
// ----[x] npm i dotenv dans el service concerné
// [x] Mettre a jour le document ReadeMe.md du root pour y ajouter la ligne concernant le nouveau service, suivre le pattern
// [ ] Mettre a jour les fichier en rapport avec Docker compose, file, start.sh
// ----[ ] Dockerfile
// ----[ ] compose.yaml
// ----[ ] start.sh
// [ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier, suivre le pattern.
// [ ] Mettre ce proccess au propre dans la documentation, servira de guide pas a pas pour les prochain service.


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // TODO : configEnv ne marche pas dockerisé
    origin: [`http://localhost:${configEnv.FRONT_PORT_CLIENT}`,`http://localhost:3000`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(configEnv.CONFIG_PORT_API);
}
bootstrap();
