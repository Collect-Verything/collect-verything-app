import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO :
// [x] Generer un nouveau service avec la commande :  npx @nestjs/cli new new-service
// [x] Afficher les dossier caché dans le finder et aller dans le dossier du nouveai service puis supprimer le dossier caché .git
// [x] Dans le git dif retablif le fichier  present /.idea/vsc.xml (pour retablir le repo originel
// [x] Supprimer les fichier  service et controller app. et supprimer egalement ces elements present dans le main module (generé a la creation)
// [x] Generer les premiere ressource avec la commande
// [ ] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root. (installation, db si necessaire, run ) suivre le pattern present.
// [ ] Configuration du fichier main du nouveau service avec le .env comportant le port de ce nouveau service( ce fichier . env contient deja plusieur port, prendre le port suivant disponible, ce fichier sert ensuite a partager les port pour la futur API Gateway)
// [ ] Mettre a jour le document ReadeMe.md du root pour y ajouter la ligne concernant le nouveau service, suivre le pattern
// [ ] Mettre a jour les fichier en rapport avec Docker compose, file, start.sh
// [ ] Mettre a jour les action github en rajouttant le nouveau service, donc un nouveau fichier, suivre le pattern.
// [ ] Mettre ce proccess au propre dans la documentation, servira de guide pas a pas pour les prochain service.


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
