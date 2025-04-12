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

Ce projet n’utilise **pas** de fichier `.env`, mais un fichier TypeScript de configuration :

```
src/env-config.ts
```

Vous pouvez y modifier les éléments suivants pour faire fonctionner ce service indépendamment :

- `DOMAIN_AUTH`
- `AUTH_PORT`
- `PORT_BY_PATH`
- `DOMAIN_BY_PATH`
- etc.

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

