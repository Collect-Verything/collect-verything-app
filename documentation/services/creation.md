# Creation d'un service

Si l'on souhaite creer un service il est necessaire de :

## Creer un service dans le root du mono repo
```bash
 npx @nestjs/cli new new-service
```

## Creation des scripts tous la gestion simplfifié depuis le root 

*Install*
```json
      "__INSTALL__":"", # Permet un reperage plus facile par section

    "install:front": "cd front-app && npm install",
    "install:auth": "cd auth-service && npm install",
    "install:new-service": "cd new-service && npm install", # Ajout du script installation depuis le root

    "install:all": "npm run install:front & npm run install:auth & npm run install:new-service", # Ajout script install all 
```

*Run start*
```json
        "__NEW SERVICE__": "",

    "start:new-service": "npm run start --prefix new-service", # Ajout des script start dev et prod
    "start:new-service": "npm run start:dev  --prefix new-service",

```

*Database*
```json
    "generate:auth": "cd auth-service && npx prisma migrate dev --name \"Setup auth db\"",
    "seed:auth": "cd auth-service && npx prisma db seed",
    "db:auth": "npm run generate:auth && npm run seed:auth",
    
    "generate:new-service": "cd new-service && npx prisma migrate dev --name \"Setup new-service db\"", # Ajout script de migration
    "seed:new-service": "cd new-service && npx prisma db seed", # $*$ Ajout commande seed du service 
    "db:new-service": "npm run generate:new-service && npm run seed:new-service", # Script de la generation du service

    "db:all": "npm run db:auth & npm run db:new-service",  # Ajout du run global du serice crée
```

Attention pour pouvoir executer ces commandes il est necessaire que dans le package.json du nouveau service generé les commande suivante soit crée pour les scripts possedant une $*$ :
```json
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
```

*Start all*
```json
        "__START__": "",

    "start:prod": "npm run start:front & npm run start:auth-prod & npm run start:new-service", # Ajout de la nouvelle commande de notre nouveau service pour la prod et dev
    "start:dev": "npm run start:front & npm run start:auth-dev & npm run start:new-service"
```


## Creation de l'env du nouveau service :

Dans le fichier .env à la racine du monorepo il faut assigner un port au nouveau service generé:

```env
AUTH_PORT=3001
NEW_SERVICE_PORT=666  Trouver un port disponible et logique 
```

Nous devons ensuite assigner ce nouveau port a notre nouveau service qui possede un port par defaut, pour cela il faut creer le fichier suivant à la racine du dossier de notre nouveau service :
```bash
cd new-service
touch env-config.ts
```

Installer la dependance dotenv:
```bash
npm i dotenv
```

Puis saisir le code suivant : 
```ts
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Attention à l'import, pour ce project celui ci est correct

export const configEnv = {
  NEW_SERVICE_PORT_API: process.env.NEW_SERVICE,
};
```

Maintenant que nous avons crée un object comportant le port que l'on souhaite, il suffit simplement de l'ajouter dans le main de notre nouveau service  :
```bash
#new-service/src/main.ts

import { configEnv } from '../env-config'; # Importer l'object

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  #...
  await app.listen(configEnv.NEW_SERVICE_PORT_API);
```

Maintenant on peut lancer toute les app ou le service souhaité via nos script depuis le root et constater que le port est celui que nous avons definit.

```bash
npm run start:new_solution-dev
# ou alors 
npm run start:dev
```
