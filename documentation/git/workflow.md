← [Retourner au sommaire] [summary]

# 🌳 Conventions Git – Branches & Workflow

## 🎯 Objectif

Mettre en place un **workflow Git structuré**, robuste et adapté à un environnement de développement en **monorepo**, avec :

* Des branches permanentes (`main`, `dev`)
* Des branches temporaires (`feature/*`, `release/*`, `hotfix/*`)
* Une stratégie claire de **merge et livraison**
* Une **CI/CD** alignée : lint & tests sur *feature/dev*, build Docker sur *main*

---

## 🧱 Branches principales

### `main` – Production

* ✅ Contient le code **stable et déployé**
* ✅ Déclenche le **build & push Docker** (CI/CD)
* 🔒 Merge **uniquement** via PR
* 🔒 **2 approbations** obligatoires

### `dev` – Intégration

* 🧪 Point central de **fusion des features**
* ✅ Déclenche **Lint + Tests** (CI)
* 💡 Toutes les branches **partent de `dev`**
* 🔒 **2 approbations** obligatoires
* 🧪 Tests QA et validations pré-release

---

## 🔄 Branches temporaires

### `feature/ma-nouvelle-fonction`

* 📌 Pour **chaque développement**
* 🧬 Créée depuis `dev`
* ✅ PR **obligatoire** → `dev`
* 🧹 Supprimée après merge

### `release/x.y.z`

* 🚀 Gèle le code en vue de la production
* 🔁 Merge depuis `dev`
* 🔁 Merge final → `main` & `dev`
* 🧹 Supprimée une fois livrée

### `hotfix/bug-critique`

* 🚨 Correction immédiate sur `main`
* 🔁 Merge vers `main` & `dev`
* 🧹 Supprimée après validation

---

## 🧪 Exemple de cycle complet

```text
1) feature/signup-page → dev (PR + reviewers)
2) release/1.2.0 ← dev (freeze, QA)
3) Corrections éventuelles dans release
4) release/1.2.0 → main + dev
```

---

## 🛡️ Règles GitHub (Protections)

| Branche | PR obligatoire | Relecteurs | Push direct          | CI/CD déclenchée       |
| ------- | -------------- | ---------- | -------------------- | ---------------------- |
| `main`  | ✅              | ✅ 2x       | ❌ *(admin possible)* | 🐳 Build & push Docker |
| `dev`   | ✅              | ✅ 2x       | ❌ *(admin possible)* | 🧹 Lint + 🧪 Tests     |

* ✅ **PR obligatoire**
* ✅ **Revalidation si nouveaux commits**
* ✅ **Checks de tests (status checks required)**
* ✅ **Signature de commits** (optionnel recommandé)

---

# ⚙️ CI/CD – Front-App

Cette section décrit le workflow **Front-App CI** (GitHub Actions) et son comportement.

## 🔄 Déclencheurs

```yaml
on:
  push:
    branches: ['**']
    paths:
      - 'front-app/**'
      - '.github/workflows/publish-front-app.yml'
  pull_request:
    branches: ['dev', 'main']
    paths:
      - 'front-app/**'
      - '.github/workflows/publish-front-app.yml'
```

**Ce que ça signifie :**

* **Push sur n’importe quelle branche** → le workflow ne se lance **que si** des fichiers dans `front-app/` (ou le fichier du workflow) ont changé.
* **PR vers `dev` ou `main`** → permet de valider avant merge, **sans** forcément builder l’image.

> Le filtrage par `paths` évite de déclencher la CI Front quand seuls d’autres services du monorepo ont été modifiés.

---

## 🧹 Job `lint`

```yaml
if: >
  (github.event_name == 'push' && github.ref != 'refs/heads/main') ||
  (github.event_name == 'pull_request' && github.event.pull_request.base.ref == 'dev')
```

* S’exécute sur :

    * **Push** sur **toutes les branches sauf `main`** (donc `dev`, `feature/*`, `hotfix/*`, etc.)
    * **PR dont la base est `dev`** (feature → dev)

**Étapes clés :**

1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 18)
3. `npm ci` à la **racine**
4. `npm ci` dans `./front-app`
5. `npm run lint` dans `./front-app`

**Pourquoi installer aussi à la racine ?**
Le projet utilise la **Flat Config** d’ESLint (`eslint.config.mjs`) à la **racine**, qui importe des paquets (`@eslint/js`, plugins, etc.). L’installer à la racine garantit que ces imports sont résolus dans la CI.

---

## 🧪 Job `test`

Condition **identique** au job `lint` et dépend de celui-ci (`needs: lint`).

**Étapes clés :**

1. Checkout & Setup Node
2. `npm ci` **racine**, puis `npm ci` **front-app**
3. `npm run jest` dans `./front-app`

---

## 🐳 Job `build-and-push`

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

* **Uniquement** lors d’un **push sur `main`** (ex : merge de `dev` → `main`).
* Construit et pousse l’image Docker de `front-app` vers Docker Hub :

```
<DOCKER_HUB_USERNAME>/front-app:latest
```

**Étapes clés :**

1. Checkout
2. Login Docker Hub (secrets : `DOCKER_HUB_USERNAME`, `DOCKER_HUB_ACCESS_TOKEN`)
3. Setup Buildx
4. `docker/build-push-action@v6` avec `context: ./front-app`

---

## 🧭 Matrice de comportement (résumé)

| Action              | Branche/PR  | Lint | Tests | Build Docker |
| ------------------- | ----------- | ---: | ----: | -----------: |
| Push sur *feature/* | `feature/*` |    ✅ |     ✅ |            ❌ |
| PR feature → dev    | base `dev`  |    ✅ |     ✅ |            ❌ |
| Push/Merge → `dev`  | `dev`       |    ✅ |     ✅ |            ❌ |
| Push/Merge → `main` | `main`      |    ❌ |     ❌ |            ✅ |

---

## ✅ Bonnes pratiques

* **`npm ci`** en CI (plus rapide, reproductible via `package-lock.json`)
* **Séparer** lint/test (dev/feature) du build Docker (main)
* **Limiter** les workflows par `paths` pour chaque service du monorepo
* **Secrets GitHub** : stocker les identifiants Docker Hub dans `Settings → Secrets and variables → Actions`
* **Tags Docker** : garder `:latest` pour `main` ; si besoin, ajouter un tag versionné (`:1.2.3`) ou `:sha-<short>`.

---

## 🛠️ Dépannage (FAQ)

**Erreur : `ERR_MODULE_NOT_FOUND: Cannot find package '@eslint/js'`**
➡️ Installer aussi les dépendances à la **racine** (`npm ci`) car `eslint.config.mjs` est à la racine.

**Le workflow Front se déclenche alors que je touche un autre service ?**
➡️ Vérifier la section `paths:` du workflow Front. Elle doit rester limitée à `front-app/**` + le fichier du workflow.

**Je veux aussi lancer lint/test sur des PR vers `main`**
➡️ Ajoute `github.event.pull_request.base.ref == 'main'` dans la condition des jobs lint/test.

---

## 📌 Pourquoi ce workflow ?

✔️ **Qualité** : lint & test sur toutes les branches de dev
✔️ **Contrôle** : build Docker uniquement lors de la mise en prod (`main`)
✔️ **Monorepo-friendly** : déclenché uniquement si le dossier `front-app/` change
✔️ **Performance** : `npm ci`, Buildx, filtres précis

---

[summary]: ../README.md
