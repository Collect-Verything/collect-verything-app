← [Retourner au sommaire] [summary]

### Étape 1 : Créer un dépôt GitHub

1. **Connectez-vous à GitHub** : Accédez à [GitHub](https://github.com) et connectez-vous à votre compte.

2. **Créer un nouveau dépôt** :

   - Cliquez sur le bouton **"New"** ou **"New repository"**.
   - Donnez un nom à votre dépôt, par exemple `monorepo-project`.
   - Choisissez si vous voulez que le dépôt soit **public** ou **privé**.
   - Ne cochez pas l'option pour **initialiser le dépôt avec un README**.
   - Cliquez sur **"Create repository"**.

### Étape 2 : Configurer le projet local

1. **Créez le répertoire principal pour votre monorepo** :

   ```
   mkdir monorepo-project cd monorepo-project
   ```

2. **Initialisez le dépôt Git** :

   ```
   git init
   ```

3. **Ajoutez le dépôt distant créé sur GitHub** :

   ```
   git remote add origin https://github.com/your-username/monorepo-project.git
   ```

   Remplacez `your-username` par votre nom d'utilisateur GitHub.

### Étape 3 : Créer l'application front-end en React avec TypeScript

1. **Créer l'application React** :

   Utilisez `create-react-app` pour générer une nouvelle application React avec TypeScript.

   ```
   npx create-react-app frontapp --template typescript
   ```

   Cela créera un dossier `frontapp` avec une application React configurée pour TypeScript.

2. **Naviguez dans le dossier `frontapp`** et assurez-vous que tout fonctionne en lançant l'application :

   ```
   cd frontapp npm start
   ```

   Cela devrait démarrer l'application sur `http://localhost:3000`.

3. **Revenez au répertoire racine** :

   ```
   cd ..
   ```

### Étape 4 : Créer le microservice en NestJS

1. **Installer NestJS CLI** (si ce n'est pas déjà fait) :

   ```
   npm install -g @nestjs/cli
   ```

2. **Créer le microservice** :

   Utilisez la CLI NestJS pour créer un nouveau projet NestJS dans un dossier `auth-service` :

   ```
   nest new auth-service
   ```

   Suivez les instructions pour choisir le gestionnaire de paquets (`npm` est recommandé pour rester cohérent).

3. **Naviguez dans le dossier `auth-service`** et assurez-vous que tout fonctionne en lançant l'application :

   ATTENTION : Modifier l'adresse serveur dans le src/main et le mettre en 3001.

   ```
   cd auth-service npm run start:dev
   ```

   Cela devrait démarrer le microservice NestJS sur `http://localhost:3001`.

4. **Revenez au répertoire racine** :

   ```
   cd ..
   ```

### Étape 5 : Configurer le fichier `.gitignore`

1. **Créer un fichier `.gitignore` à la racine** :

   ```
   touch .gitignore
   ```

2. **Ajouter des règles au `.gitignore`** :

   Ouvrez le fichier `.gitignore` et ajoutez les lignes suivantes :

   ```
   # Ignorer les dossiers node_modules dans toutes les sous-applications
   **/node_modules

   # Ignorer les fichiers de logs
   **/logs
   *.log
   npm-debug.log*

   # Ignorer les fichiers de build
   **/dist
   **/build
   ```

### Étape 6 : Configurer les scripts dans le `package.json` à la racine du monorepo

1. **Créer un fichier `package.json` à la racine** :

   ```
   touch package.json
   ```

2. **Ajouter des scripts pour démarrer les applications** :

   Ouvrez le fichier `package.json` et ajoutez le contenu suivant :

   ```
   {
      "name": "monorepo-project",   "version": "1.0.0",   "private": true,
      "scripts":
   	    {
   		    "start-frontapp": "npm start --prefix frontapp",
   		    "start-auth-service": "npm run start --prefix auth-service",
   		    "start": "npm run start-frontapp & npm run start-auth-service"
   	    }
      }
   ```

   - `start-frontapp` : Lance l'application front-end.
   - `start-auth-service` : Lance le microservice NestJS.
   - `start` : Lance les deux en parallèle.

Faire de meme pour la creation des nouveau micro services.

### Solution 1 : Supprimer la configuration de sous-module si non souhaitée

Si vous ne voulez pas que `auth-service` soit un sous-module Git, vous devez supprimer le fichier `.git` à l'intérieur du dossier `auth-service` et l'ajouter comme un dossier normal dans votre dépôt principal.
Le but ici est rendre maitre le root du project sur git.

1. **Supprimez le dépôt Git interne** dans le dossier `auth-service` :

   ```
   rm -rf auth-service/.git
   ```

2. **Ajoutez le dossier `auth-service` au dépôt principal** :

   ```
   git add auth-service/
   ```

3. **Ajoutez les autres fichiers** :
   Ajoutez également les autres fichiers non suivis à l'index :

   ```
   git add .
   ```

4. **Faites le commit** :

   ```
   git commit -m "Initial commit with React front-end and NestJS auth-service"
   ```

5. **Poussez les changements** :
   ```
   git push origin main
   ```

Une nouvelle erreur devrait apparaitre apres le push:

! [rejected] main -> main (fetch first)
error: failed to push some refs to ....

```
 git pull origin main --rebase
 git pull origin main
```

Il peu s'agir d'un token a ajouter dans notre git local, dans ce cas la creer le toekn dans le compte puis le glisser dans l'identification de notre terminal.

Penser egaement a generer un token pour l'identification de votre terminal.

[summary]: ../README.md
