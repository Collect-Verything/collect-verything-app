← [Retourner au sommaire] [summary]

# 🌳 Conventions Git – Branches & Workflow

## 🎯 Objectif

Mettre en place un **workflow Git structuré**, robuste et adapté à un environnement de développement en **monorepo**, avec :

- Des branches permanentes (`main`, `dev`)
- Des branches temporaires (`feature/*`, `release/*`, `hotfix/*`)
- Une stratégie claire de **merge et livraison**

---

## 🧱 Branches principales

### `main` – Production
- ✅ Contient le code **stable et déployé**
- ✅ Déclenche la **CI/CD** (Docker-Hub, etc.)
- 🔒 Merge **uniquement** via PR
- 🔒 2 approbations obligatoires

### `dev` – Intégration
- 🧪 Point central de **fusion des features**
- ✅ Déclenche la **CI/CD** (Lint, Test, etc.)
- 💡 Toutes les branches partent d’ici
- 🔒 2 approbations obligatoires
- 🧪 Tests QA et validations pré-release

---

## 🔄 Branches temporaires

### `feature/ma-nouvelle-fonction`
- 📌 Pour **chaque développement**
- 🧬 Créée depuis `dev`
- ✅ PR obligatoire → `dev`
- 🧹 Supprimée après merge

### `release/x.y.z`
- 🚀 Gèle le code en vue de la production
- 🔁 Merge depuis `dev`
- 🔁 Merge final → `main` & `dev`
- 🧹 Supprimée une fois livrée

### `hotfix/bug-critique`
- 🚨 Correction immédiate sur `main`
- 🔁 Merge vers `main` & `dev`
- 🧹 Supprimée après validation

---

## 🧪 Exemple de cycle complet

```text
1. feature/signup-page → dev (via PR + reviewers)
2. release/1.2.0 ← dev (freeze, QA)
3. Corrections éventuelles dans release
4. release/1.2.0 → main + dev
```

---

## 🛡️ Règles GitHub (Protections)

| Branche  | PR obligatoire | Relecteurs | Push direct | CI/CD |
|----------|----------------|------------|-------------|--------|
| `main`   | ✅              | ✅ 2x       | ❌ *(admin possible)* | ✅    |
| `dev`    | ✅              | ✅ 2x       | ❌ *(admin possible)* | 🔄    |

- ✅ **PR obligatoire**
- ✅ **Revalidation si nouveaux commits**
- ✅ **Check de tests (status check required)**
- ✅ **Signature de commits (optionnel recommandé)**

---

## 🧼 Bonnes pratiques

- 🔖 Nommer vos branches clairement : `feature/`, `release/`, `hotfix/`
- 🔁 Supprimer les branches une fois mergées
- 📝 Documenter vos PR (titre + description + ticket lié)
- 👀 Prioriser des PRs courtes et bien segmentées

---

## 📌 Pourquoi ce workflow ?

✔️ Fiabilité : Code stable en production  
✔️ Collaboration : Moins de conflits, merge clair  
✔️ CI/CD maîtrisé : Déclenchement uniquement sur `main`  
✔️ Sécurité : Review + validation = contrôle qualité


[summary]: ../README.md
