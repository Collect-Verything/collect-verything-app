← [Retourner au sommaire] [summary]

# 🌱 Environment – Gestion des variables d’environnement

## ✅ Centralisation actuelle avec `configEnv.ts`

Chaque microservice dispose maintenant de son propre fichier `.env`, contenant **les variables spécifiques à son exécution** (port, URL, base de données, etc.).  
On utilise un fichier `configEnv.ts` pour centraliser l’accès aux variables d’environnement via `process.env`.

### 🔧 Chargement automatique
Ne surcharge plus le chemin `.env` dans `dotenv.config()` :

```ts
import * as dotenv from 'dotenv';
dotenv.config(); // charge automatiquement le .env local au service
```

Finalement, l’appel à dotenv.config() n’est plus nécessaire ici, car il est déjà exécuté une seule fois au bon endroit dans l’application.

---

### ✅ Avantages

- **Clarté & lisibilité**  
  Accès centralisé et propre à toutes les `env`.

- **Validation facile**  
  On peut vérifier les `env` critiques dès le démarrage.

- **Refactorisation sûre**  
  Renommer une variable d’env devient simple et fiable.

- **Testabilité**  
  Facile à mocker dans les tests unitaires (`jest.mock`).

- **Isolation des services**  
  Chaque microservice est autonome et portable.

---

### 🚗 Détection rapide des erreurs `.env`

Au démarrage, on vérifie explicitement les variables critiques :

```ts
if (!configEnv.PRODUCT_PORT) {
  throw new Error("❌ Missing PRODUCT_PORT in environment variables");
}
```

➔ Cela évite des crashs silencieux ou des bugs difficiles à tracer.

---

## 🥰 Historique – Méthode centralisée (❌ Dépréciée)

### 📦 Ancienne logique

Lors de la phase de développement initiale, un seul fichier `.env` était placé **à la racine du monorepo**.  
Chaque service allait chercher ses variables via :

```ts
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
```

Cela permettait de :

- centraliser tous les ports et URLs,
- simplifier la config de l'API Gateway.

### ❌ Inconvénients
- Mauvaise isolation des services
- Impossible de déployer un service indépendamment
- Fragile en production (les chemins ne tiennent plus)

---

### 🔪 Exemple d’ancienne implémentation

Lors du developpement un fichier .env etait présent à la racine du mono-repo pour centraliser la gestion des ports et des URLs de tous les microservices. Cela permet de simplifier la configuration et les modifications au niveau de l'API Gateway, garantissant une gestion cohérente des connexions entre les différents services.

Chaque valeur des fichiers .env etait appelée au sein de chaque service via le fichier env-config.ts.

L’exemple ci-dessous montre comment, dans le cadre d’un développement local, j’avais centralisé toutes les variables d’environnement dans un seul fichier.
#### Dans le service

Ici, on peut constater qu’il est possible de surcharger l’emplacement par défaut où l’application va chercher son fichier .env.

```ts
// env-config.ts (ancienne méthode)
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  EMAIL_MESSAGE_BROKER: process.env.EMAIL_MESSAGE_BROKER,
};
```

#### Dans le `.env` root

```dotenv
EMAIL_MESSAGE_BROKER=value
```

---

## ✅ Conclusion

> La centralisation via `configEnv.ts` combinée à un `.env` local par service est aujourd’hui **la méthode retenue** :
> - plus claire
> - plus robuste
> - plus adaptée au déploiement multi-service

[summary]: ../README.md
