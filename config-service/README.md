<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<p align="center">
  <strong>Config Service</strong> – Microservice de gestion des abonnements Stripe et de la configuration des sites web dans l'écosystème Collect & Verything.
</p>

---

## ✨ Description

Ce microservice est dédié à la gestion des abonnements utilisateurs via **Stripe**, ainsi qu'à la **configuration des sites web** associés à chaque abonnement.

Il permet notamment de :
- Récupérer et synchroniser les abonnements d’un utilisateur avec Stripe.
- Mettre à jour ou désactiver les abonnements expirés.
- Gérer la visibilité (`published`) et la configuration (`configured`) des sites web associés.
- Créer et supprimer les configurations de site web liées à un abonnement.

---

## 🔧 Setup

```bash
# Installation des dépendances
npm install
```

---

## 🚀 Lancer le service

### En local :
```bash
npm run start:dev
```

### En production :
```bash
npm run start:prod
```

### Avec Docker :
```bash
docker build -t config-service .
docker run -p 3004:3004 config-service
```

> Le port peut varier selon ta config.

---

## 🔑 Configuration

Toutes les variables sont à définir dans le fichier `env-config.ts` (ou `.env` selon ta structure).

Exemple :

```ts
export const configEnv = {
  STRIPE_API_KEY: 'sk_test_xxxxxxxx',
  DOMAIN_CONFIG: 'localhost',
  CONFIG_PORT: 3004,
  // ...
};
```

---

## 🧠 Principales fonctionnalités

### 🔁 Synchronisation des abonnements Stripe

```ts
await subscriptionService.findAllByUserId(user_stripe_id);
```

- Récupère les abonnements Stripe.
- Met à jour les statuts en base (`active_stripe`).
- Désactive ceux qui ont expiré.

### 🧩 Configuration du site web

```ts
await configurationService.create(sub_id, createConfigurationDto);
```

- Création de la configuration (`url`, `brand_name`, `admin_email`, etc.).
- L’abonnement doit d’abord être actif.

### 🕹 Publication / configuration

- `configured`: Indique si l’abonnement est prêt à être publié.
- `published`: Indique si le site est visible publiquement.

```ts
await subscriptionService.configureSubById(sub_id, true);
await subscriptionService.publishWebSite(sub_id, true);
```

---

## 📦 Seed (facultatif)

```bash
npx prisma migrate dev --name "init"
npx prisma db seed
```

---

## ✅ Tests

```bash
# Unit
npm run test

# Coverage
npm run test:cov
```

---

## 📎 Notes techniques

- Stripe est intégré via `stripe-node`.
- Prisma est utilisé comme ORM pour la gestion des abonnements et configurations.
- Les logs d'activité peuvent être enrichis dans les services selon les besoins.

---

## 🛟 Support & Contribution

Pour contribuer à ce microservice, merci de :
- Mettre à jour les commentaires JSDoc et fichiers Swagger si les routes changent.
- Ajouter un test unitaire pour chaque méthode critique.
- Valider manuellement l'impact des changements avec l'API Gateway.

---

## 📄 License

Ce projet utilise la licence MIT.

