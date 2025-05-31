import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvValue, configEnv } from '../env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    // origin: [`http://${configEnv.DOMAIN}:${configEnv.DOMAIN}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  checkEnvValue();

  await app.listen(configEnv.DELIVERY_PORT);
}
bootstrap();

//
// TODO :
//     [x] Generer un nouveau service avec la commande : npx @nestjs/cli new new-service
//     [x] Afficher les dossier caché dans le finder puis supprimer le dossier caché .git, .eslintrc.js & .prettierrc du nouveau service
//     [x] Dans le git dif retablir le fichier present /.idea/vsc.xml (laisser le git root en maitre)
//     [x] Supprimer les fichier de base generé par nestjs
//     [x] Generer les premiere ressource avec la commande 'nest g resource'
//     [x] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root. (...)
//     [x] Ajout du nouveau port dans le .env du root et le front
//     [x] Mettre à jour la doc env poke center
//     [x] Mettre à jour les .env front et root avec l'url service et port du nouveau service
//     [x] Creer fichier env-config.ts pour la recuperation des .env du root (suivre pattern present dans les autres service)
//     [x] Configuration du fichier main du nouveau service

//     [ ] Mise a jour des root dans Api Gateway
//     [ ] npm i dotenv dans le service concerné
//     [ ] Mettre a jour les fichier en rapport avec Docker (suivre pattern existant)
//     [ ] Dockerfile
//     [ ] compose.yaml
//     [ ] start.sh
//     [ ] Creer les tests unitaires
//     [ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier. (suivre le pattern)
//     [ ] Mettre à jour les documentations : diagrammes de classes, de séquence, d’architecture, etc.
