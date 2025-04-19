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
  {
    "id": 1,
    "quantity": 2
  },
  {
    "id": 5,
    "quantity": 1
  }
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

Ce projet utilise un fichier configEnv pour centraliser toutes les variables issues du .env, afin de faciliter le débogage et la gestion des configurations.

```
src/env-config.ts
```

Voici les variables d’environnement nécessaires au bon fonctionnement du service. Vous pouvez modifier les ports selon vos besoins, mais veillez à rester cohérent avec les fichiers .env du frontend et
des autres services si vous utilisez l’application de manière globale.

Pour plus de simplicité, voici une configuration .env de base cohérente pour assurer le bon fonctionnement de l’ensemble des services.

```env
DATABASE_URL="mysql://root:password@mysql-product:3306/product-db?schema=public"

DOMAIN=localhost

API_GATEWAY_PORT=2999

PRODUCT_PORT=3002
PRODUCT_URL=product
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
