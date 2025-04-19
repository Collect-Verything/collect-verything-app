<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h2 align="center">API Gateway - Collect & Verything</h2>

<p align="center">
  Gateway centralisée pour orchestrer la communication entre les différents microservices de l'application <strong>Collect & Verything</strong>.
</p>

---

## 🚀 Description

Ce service est une **API Gateway** développée avec **NestJS**. Elle agit comme point d’entrée unique pour toutes les requêtes clients, en s'occupant du routage vers les microservices appropriés, de la gestion de la sécurité (token, authentification) et de la logique métier globale.

## 🧠 Fonctionnalités principales

- 🔁 Routage intelligent vers les services : auth, produit, facturation, etc.
- 🔒 Vérification centralisée du JWT via le microservice d’authentification.
- ✅ Prise en charge des routes publiques sans authentification.
- ⚙️ Configuration via un fichier `config-env.ts` pour faciliter l'adaptation indépendante.

---

## ⚙️ Installation

```bash
npm install
```

---

## 🧪 Lancement en local

```bash
# Démarrage standard
npm run start

# Mode développement
npm run start:dev
```

## 🐳 Utilisation via Docker

```bash
# Build de l'image
docker build -t api-gateway .

# Lancement du container
docker run -p 2999:2999 api-gateway
```

---

## 🔧 Configuration

Ce projet utilise un fichier configEnv pour centraliser toutes les variables issues du .env, afin de faciliter le débogage et la gestion des configurations.

```
src/env-config.ts
```

Voici les variables d’environnement nécessaires au bon fonctionnement du service. Vous pouvez modifier les ports selon vos besoins, mais veillez à rester cohérent avec les fichiers .env du frontend et des autres services si vous utilisez l’application de manière globale.

Pour plus de simplicité, voici une configuration .env de base cohérente pour assurer le bon fonctionnement de l’ensemble des services.

```dotenv
DOMAIN=localhost

FRONT_PORT=3000

API_GATEWAY_PORT=2999

DOMAIN_AUTH=auth-service

AUTH_PORT=3001
AUTH_URL_AUTH=auth
AUTH_URL_ROLES=roles
AUTH_URL_USERS=users

DOMAIN_PRODUCT=product-service

PRODUCT_PORT=3002
PRODUCT_URL=product

DOMAIN_FACTURATION=facturation-service

FACTURATION_PORT=3003
FACTURATION_URL=stripe

DOMAIN_CONFIG=config-service

CONFIG_PORT=3004
CONFIG_URL=subscription
```

---

## ✅ Tests

```bash
# Tests unitaires
npm run test

# Tests end-to-end
npm run test:e2e

# Couverture de test
npm run test:cov
```

---

## 📎 Liens utiles

- [NestJS - Documentation Officielle](https://docs.nestjs.com)
- [Docker - Créer une image personnalisée](https://docs.docker.com/engine/reference/commandline/build/)
- [Axios - Client HTTP utilisé dans le routage](https://axios-http.com)

---

## 📝 License

Ce projet est sous licence MIT.
