← [Retourner au sommaire] [summary]


# Environment


## Root

Un fichier .env est présent à la racine du mono-repo pour centraliser la gestion des ports et des URLs de tous les microservices. Cela permet de simplifier la configuration et les modifications au niveau de l'API Gateway, garantissant une gestion cohérente des connexions entre les différents services.

Chaque valeur des fichiers .env est appelée au sein de chaque service via le fichier env-config.ts.

Chaque microservice doit être indépendant, et donc disposer de son propre fichier .env. La raison pour laquelle j’ai centralisé le fichier .env est simplement de simplifier le développement dans le cadre d’une étude de projet. Cela permet d’alléger la documentation liée à la création des fichiers .env pour chaque service.
Si l'on souhaite utiliser un micro service de facon independante il suffit simplement de remplacer le env-config.ts en .env en gardant les clé car elle sont identique puis de placer les value comme ceci:

#### Avant

```ts
// env-config.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  EMAIL_MESSAGE_BROKER: process.env.EMAIL_MESSAGE_BROKER,
};

```

#### Apres
```dotenv
#.env
EMAIL_MESSAGE_BROKER=value
```

### Service database
Chaque microservice dispose également de son propre fichier .env, qui contient uniquement l'URL de sa base de données. Cette configuration locale est spécifique à chaque microservice, car chaque conteneur utilise une base de données dédiée. Il n'est donc pas nécessaire de déplacer ces URLs, car elles sont conçues pour être indépendantes et propres à chaque service.
La raison pour laquelle les fichiers .env de chaque service — contenant les URL des bases de données — ne sont pas regroupés dans un fichier .env à la racine, est que je n’ai pas encore trouvé de moyen d’appeler ces fichiers .env via configEnv dans un fichier .prisma.

[summary]: ../README.md
