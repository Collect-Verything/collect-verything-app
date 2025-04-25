← [Retourner au sommaire] [summary]

# 🚀 Mise à jour sécurisée de la branche `main`

## ❌ Ancienne méthode (non sécurisée)

Historiquement, la mise à jour de `main` depuis `dev` se faisait manuellement via les commandes suivantes :

```bash
git checkout main
git pull origin main
git merge dev
git add .
git commit -m "Merge dev into main"
git push origin main
```

### ⚠️ Problèmes rencontrés :

- Pas de **pull request** : pas de validation ni de contrôle.
- Les **GitHub Actions** liées au **build & push Docker** ne se déclenchaient pas (car elles nécessitaient une PR vers `main`).
- Risque de merge direct sur une branche protégée, même sans review.

---

## ✅ Nouvelle méthode via branche `release`

Désormais, toute mise à jour de `main` doit suivre un processus structuré et sécurisé à travers une branche de type `release`.

### 🧭 Étapes recommandées

1. **Créer une issue**
    - Ajouter un titre clair (ex : `Préparation release v1.2.0`)
    - Tagger avec `type:release`, `main-update`, etc.

2. **Créer une branche `release/` liée à l'issue**
    - Exemple : `release/1.2.0`
    - Elle doit être créée depuis `dev`

3. **Créer une Pull Request vers `main`**
    - Aller dans l’onglet **"Branches"** de GitHub
    - Cibler la branche `release/1.2.0`
    - Cliquer sur **"Create Pull Request"**
    - Base : `main` / Compare to : `release/1.2.0`

4. **Valider la PR**
    - S’assurer que :
        - ✅ Les **tests** passent
        - ✅ Le **lint** est OK
        - ✅ Le **build & push Docker** est déclenché
    - Ajouter au moins **2 reviewers** pour approbation (si règle active)

5. **Merge la PR une fois validée**

6. **(Optionnel)** Mettre à jour localement :
   ```bash
   git checkout main
   git pull origin main
   ```

---

## 🔁 Résumé du flux

```text
dev ➜ release/x.y.z ➜ main
```

- `release/*` est une **copie figée** de `dev` à un instant T
- Permet de déclencher proprement les **CI/CD**
- Garantit une **validation formelle** de chaque mise à jour en production

---

✅ **Bonus** : les branches `release/*` peuvent être supprimées après merge pour garder le dépôt propre.

[summary]: ../README.md
