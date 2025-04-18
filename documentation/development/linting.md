← [Retourner au sommaire] [summary]


# Linting

Using [ESlint], [`typescript-eslint`][typescript-lint] and several plugins.
Actually a basic config is set.

## Issue

### 📌 Problème rencontré avec npm install dans le dossier front-app
En travaillant dans notre monorepo, j’ai constaté un comportement inattendu concernant le linting dans l’application front-end (front-app).

❗ Constat
Lorsque j’exécute la commande suivante dans le dossier front-app :

```zsh
npm install
npm run lint
```

Le linter ne parvient pas à s'exécuter correctement. L'erreur semble provenir d’un conflit ou d’un problème de versions dans les dépendances locales (notamment avec @typescript-eslint).

#### ✅ Comportement attendu
En revanche, si je supprime le dossier node_modules de front-app, puis que je lance :

J'ai pu remarquer que l'orsque je faisais un npm install dans le dossier front-app et je lancais la commande npm run lint, le lint ne pouvais pas s'executer pour des raison de probleme de dpeendance, par contre si je supprime le node module j'ai cru comprend que npm allait chercher le node module parent, et la la commande s'execute.
Remarque important car dans la CI l'execution des test effectué un npm install dans /front-app pour cela j'ai modifié le chemin d'installation comme ci dessous :

```zsh
npm run lint
```
Le linter fonctionne parfaitement. Cela s'explique par le fait que Node.js, lorsqu’il ne trouve pas un module localement, remonte l’arborescence des dossiers pour aller chercher les dépendances dans le node_modules du dossier parent — en l’occurrence, à la racine du monorepo.

#### 🛠️ Adaptation dans la CI/CD

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
#### 🎯 Résultat
Les dépendances sont désormais installées à la racine du projet, ce qui évite les conflits.

Le linter est exécuté dans le bon dossier (front-app) tout en utilisant les dépendances centralisées.

TROUVER UNE PISTE D'AMELIORATION


[//]: # "--- Images and links section ---"
[eslint]: https://eslint.org/
[typescript-lint]: https://typescript-eslint.io/


[summary]: ../README.md
