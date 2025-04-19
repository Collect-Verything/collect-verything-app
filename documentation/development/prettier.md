← [Retourner au sommaire] [summary]

# Formatting – Prettier

Using [Prettier], a global configuration is applied to the entire monorepo (backend & frontend) to ensure consistent formatting across all services and apps.

## 🎯 Objectif

Ce projet utilise une configuration Prettier centralisée dans un fichier `prettier.config.js` à la racine du monorepo.

Cette configuration permet de :

- Garantir une mise en forme uniforme du code dans tous les services
- Réduire les différences inutiles dans les commits (ex : indentation, guillemets)
- Faciliter la lecture et la maintenance du code sur l'ensemble du projet

---

## 🧠 Configuration globale

Tous les fichiers `.ts`, `.js`, `.tsx`, `.jsx` du projet suivent les règles définies dans le fichier `prettier.config.js` :

```js
export default {
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: 'front-app/**/*.{ts,tsx,js,jsx}',
      options: {
        tabWidth: 4,
      },
    },
  ],
};
```

---

## 🎨 Particularité du front (`front-app/`)

Une exception est appliquée spécifiquement pour le dossier `front-app/`, contenant des fichiers React :

- L'indentation est volontairement augmentée à `tabWidth: 4`
- Cela améliore la lisibilité du HTML/JSX lors du développement
- Le reste du projet conserve `tabWidth: 2` pour respecter les conventions habituelles

---

## 📁 Ignorer des fichiers

Les fichiers/dossiers non concernés par le formatage sont listés dans `.prettierignore` à la racine :

```txt
node_modules
build
dist
coverage
```

---

## ⚙️ Utilisation

Pour vérifier ou corriger automatiquement la mise en forme du projet :

- Vérification :

```bash
npx prettier --check .
```

- Formatage automatique :

```bash
npx prettier --write .
```

---

## 📜 Dépendances nécessaires

```bash
npm install --save-dev prettier
```

---

## ✅ En résumé

- Une seule configuration Prettier pour tout le projet
- Des règles globales partagées, avec un override pour `front-app`
- Simplicité, cohérence, lisibilité : la mise en forme est automatique et universelle

---

[Prettier]: https://prettier.io/
[summary]: ../README.md
