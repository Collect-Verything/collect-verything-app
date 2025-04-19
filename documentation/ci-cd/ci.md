← [Retourner au sommaire] [summary]

# 🧪 CI – Intégration Continue

Cette configuration présente dans .github/workflows permet d’assurer la qualité et la stabilité du code , via l'exécution automatique des tests unitaires et (optionnellement) d’un linter.
Elle s’intègre directement dans le processus de développement pour alerter au plus tôt en cas de régression ou d’erreur.
On peut constater qu'il y a un pattern de configuration repeté pour touts les services et app.

# 🔁 Déclencheurs

### La CI s’exécute dans deux cas précis :

- Lors d’un push sur les branches main ou dev
- Lors d’une pull request vers main ou dev

👉 Cela permet de tester automatiquement toute modification, que ce soit en cours de développement (dev) ou lors d’une mise en production (main).

# ✅ Étapes actuellement actives

- test : Test unitaire de chaque services et app

✅ Elle constitue la base de vérification avant tout build ou déploiement futur.

# ⚠️ Étape optionnelle : lint

L'étape de linting est actuellement commentée dans le fichier.

Elle permettrait de :

- Vérifier la qualité du code selon les règles ESLint

- Prévenir les erreurs de style ou de syntaxe

➕ Amélioration prévue : réactiver cette étape et la rendre bloquante avant les tests et le build, afin de renforcer les contrôles qualité.

# Issue

Probleme lint concernant front-app consulter l'issue [ici]

[ici]: ../development/linting.md
[summary]: ../README.md
