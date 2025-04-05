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


[summary]: ../README.md


