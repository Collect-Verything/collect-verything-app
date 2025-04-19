← [Retourner au sommaire] [summary]


# Linting

Using [ESlint], [`typescript-eslint`][typescript-lint] and several plugins.
Actually a basic config is set.

# 📦 ESLint – Flat Config utilisée dans le Monorepo NestJS + React

## 🧭 Objectif

Ce projet utilise une configuration unique et moderne basée sur le **Flat Config (ESLint v9+)**, définie dans le fichier `eslint.config.mjs` à la racine.

Cette configuration permet de :
- Centraliser les règles ESLint pour l’ensemble du projet
- Gérer facilement plusieurs environnements (NestJS et React)
- Maintenir une cohérence sans multiplier les fichiers `.eslintrc.*`

---

## 📂 Structure de la configuration

### 🧠 Partie globale – Backend (NestJS)

Les règles générales s’appliquent à tous les fichiers TypeScript du backend.
Elles sont conçues pour s’aligner sur les bonnes pratiques de NestJS :

- Utilisation du parser TypeScript (`@typescript-eslint`)
- Recommandations ESLint standards
- Désactivation de règles inutiles (`no-inferrable-types`)
- Avertissements pour `any`, `console`, etc.

### 🎨 Override – Frontend React (`front-app/`)

Une section spécifique est dédiée au dossier `front-app`, avec :

- Support complet de React et des hooks
- Activation de JSX
- Détection automatique de la version React
- Suppression des règles obsolètes (comme `prop-types` ou `react-in-jsx-scope`)

Cela permet de garantir que les règles appliquées au front sont adaptées et isolées du backend.

---

## 📦 Suppression des fichiers `.eslintrc.*`

La configuration actuelle repose exclusivement sur le fichier `eslint.config.mjs`.
Les fichiers comme `.eslintrc.js`, `.eslintrc.json`, etc., ne sont donc plus utilisés.
S’ils sont présents, ils peuvent entrer en conflit avec le Flat Config.

Il est donc préférable de ne garder que `eslint.config.mjs` comme source de configuration ESLint.

---

## 🔍 Bonnes pratiques adoptées

- Unification des règles dans un seul fichier à la racine
- Utilisation des `files:` pour cibler précisément les contextes (backend vs frontend)
- Éviter les conflits de configurations entre services
- Structure claire et modulaire avec des `overrides` spécifiques

---

## ⚙️ Utilisation

Pour analyser le code avec ESLint :

- Projet complet :
```bash
npx eslint .
```

- Uniquement le front :
```bash
npx eslint front-app/
```

- Uniquement un service backend :
```bash
npx eslint apps/product-service/
```

---

## 📜 Dépendances nécessaires

La configuration utilise les plugins suivants :
```bash
npm install --save-dev eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks globals
```

---

## ✅ En résumé

Ce projet utilise le format Flat Config d’ESLint afin de simplifier et unifier les règles de linting.
La configuration est partagée entre tous les services NestJS et une section spécifique est dédiée à l’application React.
Cela permet une maintenance facilitée, une cohérence des règles et un usage plus moderne d’ESLint.


# 🛠️ CI/CD

Dans le pipeline CI/CD, le problème apparaissait également puisque l’étape de test faisait un npm install dans le dossier front-app, réintroduisant ainsi les mauvaises dépendances.

Pour contourner ce problème, j’ai modifié le workflow GitHub Actions comme suit :

```yaml
      - name: Install dependencies for front-end
        working-directory: .
        run: npm install

      - name: Run linter in front-end
        working-directory: ./front-app
        run: npm run lint
```


[//]: # "--- Images and links section ---"
[eslint]: https://eslint.org/
[typescript-lint]: https://typescript-eslint.io/


[summary]: ../README.md
