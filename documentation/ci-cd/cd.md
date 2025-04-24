← [Retourner au sommaire] [summary]

# 🚀 CD – Déploiement Continu

Cette étape presente dans .github/workflows est responsable de la construction et du push de l’image Docker du service api-gateway sur Docker Hub, afin qu’elle soit prête à être déployée dans un environnement de staging ou de production.
On peut constater qu'il y a un pattern de configuration repeté pour touts les services et app.

# 🔁 Déclencheurs

L’étape de déploiement continu (build-and-push) ne se déclenche que dans deux cas précis :

- Lors d’un push sur la branche main
- Lors d’une pull request vers main

👉 Cela permet de garantir que seul le code validé pour la production entraîne un build et un déploiement sur le registre Docker.

# ✅ Conditions préalables

## Actuellement, cette étape :

Dépend de l'étape test : elle ne sera exécutée que si les tests de l’étape précédente sont concluants

- ⚠️ Ne dépend pas de l’étape lint, celle-ci étant commentée pour le moment.
- ➕ Il s’agit d’un point d’amélioration futur pour renforcer la qualité du code.


## 🔀 Fusionner `dev` dans `main` (Merge Strategy)

Lorsque l'on fusionne la branche `dev` dans `main`, il est important de comprendre comment GitHub Actions réagit aux événements Git.

---

### 💡 Condition utilisée dans le workflow CI/CD

Dans notre workflow GitHub Actions, on utilise cette condition pour déclencher le job de `build-and-push` :

```yaml
build-and-push:
  if: |
    (github.event_name == 'push' && github.ref == 'refs/heads/main') ||
    (github.event_name == 'pull_request' && github.event.pull_request.base.ref == 'main')
```

---

### 📌 Explication

Cette condition couvre deux cas :

- ✅ Lorsqu’un **push direct** est effectué sur `main` (ex: après un `git merge dev && git push origin main`).
- ✅ Lorsqu’une **pull request** est ouverte vers `main`.

---

### ⚠️ Pourquoi ce choix ?

Dans notre processus actuel :

- Nous fusionnons souvent `dev` vers `main` **sans passer par une pull request**.
- Aucune **issue** ou PR n’est créée lors du merge : nous effectuons un merge direct localement puis un push.

D’où la nécessité de capturer les événements `push` sur `main` pour s'assurer que le job de build est bien exécuté.


[summary]: ../README.md
