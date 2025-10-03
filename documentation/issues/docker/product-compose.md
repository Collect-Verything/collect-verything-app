
# BIG ISSUE : PRODUCT (POST-MORTEM)
#1 Problème rencontré et causes (mots-clés) :

### 1) MySQL ACL / Host not allowed
    - Erreur initiale : "Host '172.x.x.x' is not allowed to connect"
    - Cause : utilisateur DB non autorisé à '%' (droits liés au VOLUME existant).

### 2) Volume persistant ≠ ENV/init
    - Les variables d'env et scripts d'init MySQL NE s'appliquent qu'au 1er démarrage.
    - Un ancien volume gardait des ACL différentes → changements ignorés.

### 3) Mot de passe incohérent → P1000
    - user 'product' créé avec MDP_A, mais DATABASE_URL utilisait MDP_B.
    - Erreur Prisma : P1000 Authentication failed.

### 4) Ordre Prisma (generate → migrate → seed)
    - Seed lancé avant "prisma generate" → "@prisma/client did not initialize yet".
    - Solution : start.sh impose l'ordre : generate → migrate deploy → seed.

### 5) migrate dev vs migrate deploy
    - "migrate dev" peut déclencher des comportements de dev (shadow DB / seed auto).
    - En conteneur/CI : utiliser "migrate deploy".

#### Correctifs appliqués :
 - init/01-users.sql : CREATE USER 'product'@'%' + GRANT sur `product-db` (MDP aligné avec .env)
 - Suppression du volume MySQL du service pour rejouer l'init proprement
 - start.sh : attente DB + npx prisma generate → migrate deploy → db seed → start
 - depends_on: mysql-product: { condition: service_healthy }
 - DATABASE_URL : mysql://product:<mdp>@mysql-product:3306/product-db (host = nom du service)

 TL;DR
 - Mots-clés : "ACL MySQL", "volume persistant", "MDP incohérent (P1000)", 
               "ordre Prisma", "migrate deploy", "healthcheck".


**Logs**

# Timeline & messages clés

1. **Seed initial (product-service) → refus de connexion MySQL**

* Prisma affiche la datasource :

  * `Datasource "db": MySQL database "product-db" at "mysql-product:3306"`
* **Erreur MySQL** :

  * `"Host '172.21.0.2' is not allowed to connect to this MySQL server"`
* **Conséquence Prisma** (pendant le seed) :

  * `PrismaClientInitializationError`
  * `ERROR HY000 (1130): Host '172.21.0.2' is not allowed to connect`
* ✅ Interprétation : l’utilisateur DB n’avait pas le droit de se connecter depuis `%` (ACL manquante dans CETTE instance/volume).

2. **Après ajout d’un user `product` + DATABASE_URL… → auth KO**

* Prisma datasource :

  * `MySQL database "product-db" at "mysql-product:3306"`
* **Erreur Prisma P1000** :

  * `"Authentication failed against database server at 'mysql-product', the provided database credentials for 'product' are not valid."`
* ✅ Interprétation : mot de passe du user DB ≠ mot de passe dans `DATABASE_URL` (mismatch entre `01-users.sql` et `.env`).

3. **Liste des volumes Docker (extrait)**

* `collect-verything-app_mysql-prod-data` (entre autres)
* ✅ Interprétation : c’est le volume MySQL “product” à supprimer pour rejouer les scripts d’init et réappliquer ACL/MDP.

4. **Réinit de la DB product (logs MySQL d’initialisation) – succès**

* Démarrage propre :

  * `[Entrypoint]: Initializing database files`
  * `Creating database product-db`
  * `running /docker-entrypoint-initdb.d/01-users.sql`
  * `MySQL init process done. Ready for start up.`
  * `mysqld: ready for connections … port: 3306`
* ✅ Interprétation : le script `01-users.sql` a bien tourné (création user/grant).

5. **Seed product-service → client Prisma non généré**

* Avertissement de major upgrade (contexte)
* **Erreur lors du seed** :

  * `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`
  * Stack: `new PrismaClient (/node_modules/.prisma/client/default.js:43:11)`
* ✅ Interprétation : `prisma db seed` lancé **avant** `prisma generate` (ordre d’exécution incorrect).

6. **Autres infos de build/run**

* Dockerfile Node 20-alpine, `start.sh` qui faisait :

  * wait DB (`nc -z ...`)
  * `npx prisma generate`
  * **`npx prisma migrate dev --name "Setup product db"`** (mode dev)
  * `npx prisma db seed`
  * `npm run start:debug`
* ✅ Interprétation & fix : passer à `migrate deploy` en conteneur/CI + garantir l’ordre generate → deploy → seed ; ajuster le `catch/finally` du `seed.ts` pour bien déconnecter le client Prisma.

# Problèmes → Causes (one-liners)

* **"Host not allowed"** → ACL MySQL absente pour `user@'%'` (volume existant avec mauvais droits).
* **P1000** → MDP user DB ≠ MDP dans `DATABASE_URL`.
* **"@prisma/client did not initialize yet"** → `prisma db seed` lancé avant `prisma generate`.
* **Démarrage lourd** (contexte) → migrations/seeds parallèles + services nombreux démarrant en même temps.

# Correctifs qui ont débloqué

* Création user applicatif `product@'%'` + GRANT via `init/01-users.sql`, puis **reset du volume** pour rejouer l’init.
* Alignement **mot de passe** entre `01-users.sql` et `.env` (`DATABASE_URL`).
* Orchestration d’exécution dans `start.sh` :

  * `prisma generate` → `prisma migrate deploy` → `prisma db seed` → start app.
* (Conseillé) Healthchecks + `depends_on: condition: service_healthy`.

# Mots-clés utiles pour tes recherches

* `ERROR HY000 (1130) Host ... is not allowed`
* `Prisma P1000 Authentication failed`
* `@prisma/client did not initialize yet` / `prisma generate`
* `docker-entrypoint-initdb.d` scripts only run on **empty** datadir
* `docker volume rm <mysql volume>`
* `prisma migrate deploy` vs `migrate dev`



