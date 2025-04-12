<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <strong>Facturation Service</strong> – Microservice de gestion des paiements, produits et factures via Stripe pour l'écosystème <code>Collect & Verything</code>.
</p>

---

## 🧾 Description

Ce service est en charge de toute la logique liée à **Stripe** :
- Création et mise à jour des produits (abonnement ou vente).
- Gestion des clients et des sessions de paiement.
- Réception et traitement des événements Stripe (factures, paiements).
- Récupération des historiques de facturation.

---

## ⚙️ Installation

```bash
npm install
```

---

## 🚀 Lancer le service

### En développement :

```bash
npm run start:dev
```

### En production :

```bash
npm run start:prod
```

### Avec Docker :

```bash
docker build -t facturation-service .
docker run -p 3005:3005 facturation-service
```

---

## 📁 Fonctionnalités principales

### ➕ Création de produit Stripe
```ts
stripeProductService.createProduct(product);
```

- Produit simple ou abonnement (basé sur le type).
- Gestion automatique du `default_price`.

### 🔄 Mise à jour des produits
```ts
stripeProductService.updateProduct(product);
```

- Mise à jour du nom.
- Création d'un nouveau prix si nécessaire.

### ❌ Suppression d’un produit
```ts
stripeProductService.deleteProduct(stripeId);
```

---

### 📑 Factures

#### Enregistrement automatique via les événements Stripe
Les webhooks Stripe `invoice` et `payment_intent` sont interceptés puis stockés dans la base de données.

#### Récupération des factures d’un utilisateur
```ts
stripeInvoiceService.getUserInvoices(customerId);
```

---

### 👤 Clients Stripe

Création de clients Stripe si inexistant :
```ts
stripeCustomerService.create(cleanedUserData);
```

---

### 💳 Paiement via Checkout

Génération d’une session de paiement :
```ts
stripeCheckoutService.createCheckoutSession(customerId, basket);
```

- Produit ou abonnement détecté dynamiquement.
- Mode `embedded` + redirection vers `/payment-status`.

---

## 🔐 Configuration

Modifier les clés Stripe ou autres paramètres dans `env-config.ts`.

```ts
export const configEnv = {
  STRIPE_API_KEY: 'sk_test_...',
  DOMAIN_FACTURATION: 'localhost',
  FACTURATION_PORT: 3005,
  // ...
};
```

---

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Couverture de tests
npm run test:cov
```

---

## ✍️ À propos

Ce service fait partie de l'architecture microservices de **Collect & Verything**.

> En cas d'utilisation standalone, adapter les URLs ou clés Stripe dans `env-config.ts`.

---

## 🧠 À venir

- Validation de signature Stripe pour sécuriser les webhooks.
- Historique d'abonnement enrichi (statuts, périodes, statuts de paiement).
- Support des coupons et promotions.

---

## 📄 License

MIT – Distribué librement.
