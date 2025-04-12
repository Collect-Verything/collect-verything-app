Voici une version **améliorée et personnalisée** du `README.md` pour ton **Product Service**, intégrée dans un environnement NestJS et Prisma :

---

<p align="center">
  <a href="https://nestjs.com" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<p align="center"><strong>Product Service</strong> — Microservice de gestion des produits pour l'application <code>Collect & Verything</code></p>

---

## 🧾 Description

Ce microservice est responsable de la **gestion des produits** dans l'application :  
il permet la création, modification, publication et suppression de produits.

Il communique avec une base de données MySQL via Prisma et peut être appelé par d'autres services (ex: facturation, front, etc.).

---

## 📦 Fonctionnalités principales

- Création d’un produit (`create`)
- Récupération de tous les produits (`findAll`)
- Récupération des produits visibles (`findAllVisible`)
- Récupération des produits non visibles (`findNonVisible`)
- Mise à jour (`update`)
- Décrémentation du stock sur plusieurs produits (`updateStock`)
- Suppression (`remove`)

---

## ⚙️ Installation

```bash
npm install
```

---

## 🚀 Lancement

```bash
# mode développement
npm run start:dev

# mode production
npm run start:prod

# format Prisma
npx prisma generate
```

---

## 🐳 Avec Docker

```bash
docker build -t product-service .
docker run -p 3005:3005 product-service
```

> Ce service n'expose pas de routes HTTP publiques directement, il est consommé via l'API Gateway ou via d'autres services.

---

## 🛠️ Structure du projet

- `ProductsService` : logique métier
- `PrismaService` : accès à la base de données
- `CreateProductDto`, `UpdateProductDto` : validation des données
- `StockAndID[]` : type utilisé pour décrémenter le stock lors d'un achat

---

## ✅ Exemple de payload pour updateStock

```json
[
  { "id": 1, "quantity": 2 },
  { "id": 5, "quantity": 1 }
]
```

---

## 🧪 Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 🔐 Configuration

Le service utilise un fichier `.env` ou `env-config.ts` à la racine du projet pour définir les paramètres suivants :

```env
DATABASE_URL=mysql://user:password@mysql-product:3306/collect-verything
```

---

## 📚 Ressources utiles

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📝 Licence

Ce projet est sous licence MIT.

---

Souhaite-tu que je t’ajoute aussi une section Swagger ou les routes API exposées (si tu en as), ou le lien vers l’API Gateway ?