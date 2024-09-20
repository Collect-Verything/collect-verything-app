## CI/CD Workflow Documentation
### Introduction
Ce projet utilise GitHub Actions pour automatiser les processus de linting, tests, build et déploiement Docker des services front-app et auth-service dans le dépôt. Chaque service dispose de son propre workflow CI/CD pour garantir l'indépendance des pipelines et la séparation des responsabilités.

Les actions GitHub sont configurées pour fonctionner sur deux branches principales :

*dev* : Dédiée aux processus de développement (linting et tests).
*main* : Dédiée aux processus de production (build et déploiement sur Docker Hub).


1. All.yml - All Workflow
Le fichier *.yml contient les étapes CI/CD pour les applications . Il se déclenche sur les branches main et dev, selon les actions suivantes :

### Linting et Tests : Ces étapes s'exécutent uniquement sur la branche dev lors d'un push ou d'une pull request.
Build et Push Docker : Cette étape s'exécute uniquement sur la branche main lors d'un push ou d'une pull request, et elle construit et pousse l'image Docker de l'app sur Docker Hub.

### Détails des jobs :
Lint : Vérifie la qualité du code en utilisant npm run lint dans le répertoire ./front-app.
Tests : Exécute les tests unitaires via npm run jest dans le répertoire ./front-app.
Build et Push : Construit l'image Docker et la pousse sur Docker Hub sous le nom front-app.