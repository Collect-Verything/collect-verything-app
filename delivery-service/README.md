<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<p align="center">
  <strong>Delivery Service</strong> – Microservice de gestion des livraison click and collect dans l'écosystème Collect & Verything.
</p>

---

## ✨ Description

Ce microservice est dédié à la gestion des livraison client via **interface admin livraison**.

Il permet notamment de :

- La persistance des livraison client en poitn relais et magasin.
- Mettre à jour les elememtns livré en boutique via le click and collect.

---

### Avec Docker :

```bash
docker compose up delivery-service mysql-delivery
```

---

## 🔑 Configuration

Ce projet utilise un fichier configEnv pour centraliser toutes les variables issues du .env, afin de faciliter le débogage et la gestion des configurations.

```
src/env-config.ts
```

Voici les variables d’environnement nécessaires au bon fonctionnement du service. 


```dotenv
DATABASE_URL="mysql://root:password@mysql-delivery:3306/delivery-db?schema=public"
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

- Ecoute le pattern queue RabbitMq **delivery.create** 
- Prisma est utilisé comme ORM pour la gestion des livraison.

---

## 📄 License

Ce projet utilise la licence MIT.
