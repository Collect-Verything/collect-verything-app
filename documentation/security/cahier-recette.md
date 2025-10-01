# Cahier de recette – Service Auth

## 1) Périmètre & objectifs

* **Périmètre** : endpoints d’authentification & autorisation (inscription, login, refresh, profil, logout éventuel), vérification JWT & rôles (RBAC).
* **Objectifs** :

    * Garantir qu’un utilisateur peut s’authentifier et accéder à ses données.
    * Garantir que les utilisateurs non autorisés sont **bloqués** (RBAC, tokens invalides/expirés).
    * Garantir que les **entrées invalides sont rejetées** (DTO validation).
    * Vérifier CORS et (si présents) headers sécurité côté gateway.

## 2) Pré-requis

* Environnement **DEV** déployé (ou app Nest locale) + base de données accessible.
* Comptes de test :

    * `userA` (ROLE: USER), `admin` (ROLE: SUPER_ADMIN).
* Outils : `curl` ou Postman, ou tests e2e existants (Jest + supertest).
* Secrets/variables d’env (JWT secret, URL gateway) configurés.

## 3) Endpoints testés (à adapter à ton API)

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh` (si présent)
* `GET  /auth/me` (ou `/users/me`)
* `GET  /users` (protégé SUPER_ADMIN) – pour tester RBAC
* (Optionnel) `POST /auth/logout`, `POST /auth/forgot-password`, `POST /auth/reset-password`

---

## 4) Cas de test (résumé opérationnel)

### A. Inscription – `POST /auth/register`

* **A1 – payload valide** → **201**, corps retour “user” minimal (id, email), **password non présent**.
* **A2 – email invalide / firstname < 2 / password < 6 / birthDate non ISO** → **400**, service non appelé.
* **A3 – champs non attendus** → **400** (ValidationPipe `forbidNonWhitelisted`).

### B. Login – `POST /auth/login`

* **B1 – identifiants valides** → **200**, contient `access_token` (et `refresh_token` si géré).
* **B2 – mauvais mot de passe / email inexistant** → **401**.

### C. Profil – `GET /auth/me`

* **C1 – sans Authorization** → **401/403** (selon implémentation).
* **C2 – avec `Bearer <access_token>` valide** → **200**, retourne le profil minimal (pas de champs sensibles).

### D. RBAC – `GET /users` (protégé SUPER_ADMIN)

* **D1 – user ROLE USER** → **403 Forbidden**.
* **D2 – ROLE SUPER_ADMIN** → **200** + liste.
* **D3 – token invalide** → **401** (ou 500 si guard ne catch pas → **anomalie** à corriger).
* **D4 – token expiré** → **401** (si `exp` vérifié) ; sinon **200** → **anomalie**.

### E. JWT – validité

* **E1 – token mal formé** → **401**.
* **E2 – token expiré (`exp` passé)** → **401** attendu (sinon **anomalie**).
* **E3 – token forgé avec mauvais secret** → **401**.

### F. CORS (gateway)

* **F1 – mode permissif** (`origin: '*'`) : requête avec `Origin: https://x.tld` → header `Access-Control-Allow-Origin: *`.
* **F2 – préflight OPTIONS** : `Access-Control-Allow-Methods` inclut `GET/POST/PATCH/DELETE`.
* **F3 – mode restreint** (si activé) : origin autorisée → echo ; origin non autorisée → pas de headers CORS.

### G. Headers sécurité (si en place)

* **G1 – `Content-Security-Policy` présent**, **G2 – `X-Frame-Options: DENY`**, **G3 – `Referrer-Policy`** défini.

### H. IDOR (si endpoints “par ID” côté Auth)

* **H1 – propriétaire** → **200**.
* **H2 – autre utilisateur** → **403** (ou **404** selon politique).

### I. Rate limiting (si activé)

* **I1 – rafale > seuil** → **429 Too Many Requests**.

---

## 5) Critères d’acceptation

* 100% des cas A→I **passent** (ou anomalies connues documentées avec correctifs planifiés).
* **Tokens invalides/expirés** → **401** (pas **200** / pas **500**).
* **RBAC** : accès admin uniquement → **403** pour les autres.
* **Validation** : tout payload invalide → **400** (service non appelé).
* **CORS / headers sécurité** : conformes au mode visé.

---

## 6) Exemples rapides (curl)

```bash
# Register OK
curl -i -X POST $API/auth/register -H 'Content-Type: application/json' \
-d '{"firstname":"John","lastname":"Doe","email":"john@doe.com","password":"secret123","birthDate":"2000-01-01","gender":"M","phone":"0600000000","roleId":2,"id_stripe":"cus_1"}'

# Register KO (email invalide)
curl -i -X POST $API/auth/register -H 'Content-Type: application/json' \
-d '{"firstname":"J","lastname":"Doe","email":"nope","password":"123"}'

# Login OK
curl -s -X POST $API/auth/login -H 'Content-Type: application/json' \
-d '{"email":"john@doe.com","password":"secret123"}' | jq .

# Accès admin KO avec token user
curl -i -H "Authorization: Bearer $USER_TOKEN" $API/users
```

---

## 7) Traçabilité & anomalies

| ID      | Endpoint | Cas | Résultat | Attendu | Gravité | Correctif                    | État    |
| ------- | -------- | --- | -------- | ------- | ------- | ---------------------------- | ------- |
| AUTH-01 | /users   | D4  | 200      | 401     | Haute   | Vérifier `exp` dans le guard | À faire |

---

## 8) Remarques d’implémentation (raccourci)

* **Validation** via `ValidationPipe({ whitelist:true, forbidNonWhitelisted:true, transform:true })`.
* **RBAC** : guard vérifie le rôle du JWT ; **vérifier `exp`** et renvoyer **401** si invalide/expiré, **403** si rôle insuffisant.
* **CORS** : en prod, préférer liste blanche ; si credentials, **pas** de `'*'`.
* **Headers sécurité** : Helmet ou middleware custom (CSP, frameguard, referrer-policy…).
* **IDOR** : comparer `resource.userId === req.user.id` avant retour.
