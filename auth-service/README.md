<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

<h1 align="center">Auth Service – Collect & Verything</h1>

<p align="center">Microservice d'authentification basé sur NestJS, utilisant Prisma et RabbitMQ pour la gestion sécurisée des utilisateurs et des rôles.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="license" /></a>
  <a href="https://circleci.com/gh/nestjs/nest"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" alt="Discord" /></a>
</p>

---

## 📦 Description

Ce service gère l’**authentification**, la **création d’utilisateurs** et la **gestion des rôles**. Il est conçu pour être intégré dans une architecture microservices, mais peut également être utilisé **de manière autonome**.

---

## 🔧 Configuration

Ce projet utilise un fichier configEnv pour centraliser toutes les variables issues du .env, afin de faciliter le débogage et la gestion des configurations.

```
src/env-config.ts
```

Voici les variables d’environnement nécessaires au bon fonctionnement du service. Vous pouvez modifier les ports selon vos besoins, mais veillez à rester cohérent avec les fichiers .env du frontend et des autres services si vous utilisez l’application de manière globale.

Pour plus de simplicité, voici une configuration .env de base cohérente pour assurer le bon fonctionnement de l’ensemble des services.

```dotenv
DATABASE_URL="mysql://root:password@mysql-auth:3306/auth_db?schema=public"

DOMAIN=localhost

API_GATEWAY_PORT=2999

FRONT_PORT=3000

AUTH_PORT=3001
AUTH_URL_AUTH=auth
AUTH_URL_ROLES=roles
AUTH_URL_USERS=users

FORGOT_PASSWORD_PATTERN=forgot-password
MESSAGE_BROKER_URL=broker-service
EMAIL_QUEUE=mail-queue
```

---

## 🚀 Démarrage

### ➤ 1. Installation des dépendances

```bash
npm install
```

### ➤ 2. Lancer le service en local

```bash
npm run start:dev
```

### ➤ 3. Lancer avec Docker

```bash
# Build de l'image
docker build -t auth-service .

# Lancement du conteneur
docker run -p 3001:3001 auth-service
```

> 📌 Par défaut, le port exposé est `3001`

---

## 🛠️ Setup de la base de données

### ➤ 1. Modifier la variable dans `.env`

```ts
DATABASE_URL = 'mysql://user:password@localhost:3306/auth-db?schema=public';
```

### ➤ 2. Appliquer les migrations Prisma

```bash
npx prisma migrate dev --name "init"
```

### ➤ 3. Générer les données de test

```bash
npx prisma db seed
```

---

## 🧪 Lancer les tests

```bash
# Tests unitaires
npm run test

# Tests end-to-end
npm run test:e2e

# Couverture de test
npm run test:cov
```

---

## 🔐 Swagger & Authentification

> Swagger est disponible sur : [http://localhost:3001/api](http://localhost:3001/api)

1. Se connecter avec un utilisateur seed (voir `prisma/seed.ts`)
2. Récupérer le token JWT
3. L’ajouter dans Swagger en cliquant sur l’**icône cadenas** (en haut à droite)

---

## 📁 Fonctionnalités incluses

- Authentification par JWT
- Gestion des rôles (`USER`, `SUPER_ADMIN`, `INVOICE`, `SUPPORT`)
- Création d’utilisateurs
- Protection des routes via `Guards`
- Communication via RabbitMQ (`forgot-password`)
- Swagger pour documentation automatique

---

## 📚 Ressources utiles

- [Documentation officielle NestJS](https://docs.nestjs.com)
- [Prisma ORM](https://www.prisma.io/docs)
- [RabbitMQ Tutorial](https://www.rabbitmq.com/getstarted.html)
- [Swagger NestJS](https://docs.nestjs.com/openapi/introduction)

---

## 📝 License

Ce projet est sous licence MIT.
