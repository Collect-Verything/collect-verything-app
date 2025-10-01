# “tests de sécurité”

1. **Tests automatisés** (unit/integration/e2e) qui prouvent que :

    * [x] Authentification / JWT : on refuse les tokens invalides/expirés, on applique bien les rôles.
    * [x] Autorisations (RBAC) : un user sans rôle admin ne peut pas accéder aux routes admin (ni en lecture, ni en écriture).
    * [!] Pas d’accès horizontal (IDOR) : un user A ne peut pas lire les données de B en changeant un ID dans l’URL.
    * [x] Validation d’entrée : les payloads invalides sont rejetés (types, tailles, schémas).
    * [!] Rate limiting / bruteforce : l’API bloque au-delà d’un seuil.
    * [x] CORS correctement verrouillé (origines autorisées seulement).
    * [ ] Headers de sécurité (sur Gateway) : `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, etc.
    * [ ] Téléversement de fichiers (si existant) : types/mime/tailles filtrés, noms normalisés.
    * [ ] Secrets jamais exposés : endpoints sensibles protégés, pas de clés en clair retournées.

2. **Scans automatisés** (CI) :

    * **Dépendances** : `npm audit` / Snyk.
    * **Images Docker** : Trivy.
    * **Secrets** : `gitleaks` (détection de clés commitées).
    * **DAST** (scan dynamique) : OWASP ZAP sur l’API déployée de dev.

3. **Documentation des anomalies** : un petit tableau (titre, gravité, preuve, impact, correctif, état).

---


## API (NestJS) —  Jest

### 1,2 & 3) Refus d’accès sans token & RBAC (token user ≠ admin)

**Test de sécurité – JWT & rôles (RBAC, Role-Based Access Control)**

* **Endpoint** : `GET /users` (guard `SuperAdminGuards`).
* **Scénarios e2e testés** (mock `jwt-decode`, `UsersService` mocké) :

    1. Rôle `SUPER_ADMIN` → **200 OK**.
    2. Rôle insuffisant → **403 Forbidden**.
    3. Sans `Authorization` → **403 Forbidden**.
    4. **JWT invalide** (decode lève) → **refus d’accès** *(actuel : 500, attendu : 401)*.
    5. **JWT expiré** (`exp` passé) → **anomalie** : actuellement accepté (**200**) car l’expiration n’est pas vérifiée.
* **Conclusion** : contrôles d’accès par rôle conformes.
  **Reco** : dans le guard, vérifier `exp` et renvoyer **401 Unauthorized** pour token invalide/expiré; garder **403 Forbidden** pour rôle insuffisant.



### 4) IDOR (accès horizontal)

Axe d'amelioration a developper dans les methode de chaque service

### 5) Validation d’entrée

**Objectif.** Rejeter tout payload invalide (types, tailles, schémas) avant la logique métier.

**Couverture.**

* **DTO (`CreateUserDto`)** : tests de règles (`@IsEmail`, `@MinLength`, `@IsDateString`, champs requis).
* **Service** : Return bien ce qui est demandé.
* **Contrôleur** (+ `ValidationPipe`) : payload invalide ⇒ **400**, service non appelé ; payload valide ⇒ **201**, service appelé avec un body whitelisté.
* **E2E léger** : vérification par requêtes HTTP réelles avec guards overridés.

**Résultat.** Les entrées invalides sont correctement **rejetées en 400**, seuls les payloads conformes atteignent le service.


### 6) Rate limiting

Axe amelioration du reverse proxy ...

### 7) CORS

* **Objectif** : vérifier que la politique CORS est correctement appliquée (prévenir les requêtes cross-origin non autorisées).
* **Scénarios testés** :

    1. **Mode permissif** (`origin: '*'`) : toute `Origin` reçoit `Access-Control-Allow-Origin: *` + pré-requêtes `OPTIONS` exposent bien `GET/POST/PATCH/DELETE`.
    2. **Mode restreint** (ex. reverse proxy) : l’`Origin` autorisée est écho-ée dans `Access-Control-Allow-Origin`, une `Origin` non autorisée **n’obtient aucun header CORS**.
* **Résultat** : comportement conforme aux attentes dans les deux modes.
* **Reco sécurité** : en prod, **privilégier une origin explicite** (liste blanche) et éviter `'*'`, surtout si des **credentials** (cookies/Authorization) sont utilisés.


---

# Scans CI (ajouter dans GitHub Actions)

### Dépendances

```yaml
- name: Audit npm
  run: npm audit --audit-level=high
```

### Secrets (Gitleaks)

```yaml
- uses: gitleaks/gitleaks-action@v2
  with:
    config-path: .gitleaks.toml
```

### Docker (Trivy)

```yaml
- uses: aquasecurity/trivy-action@0.24.0
  with:
    image-ref: ${{ env.IMAGE }}
    vuln-type: 'os,library'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
```

### DAST (OWASP ZAP Baseline) sur l’API de dev

```yaml
- name: OWASP ZAP Baseline
  uses: zaproxy/action-baseline@v0.10.0
  with:
    target: 'https://dev.api.example.com'
    rules_file_name: '.zap/rules.tsv' # pour ignorer du bruit si besoin
```

---

# Modèle de doc “anomalies”

Inclure un tableau comme celui-ci dans ta fiche/rapport :

| ID      | Gravité | Zone              | Description                                          | Preuve                                          | Correction proposée                          | État     |
| ------- | ------- | ----------------- | ---------------------------------------------------- | ----------------------------------------------- | -------------------------------------------- | -------- |
| SEC-001 | Haute   | API `/orders/:id` | IDOR : un user peut lire l’order d’un autre via l’ID | Requête GET avec token user A sur order B → 200 | Ajouter vérif `order.userId === req.user.id` | Corrigé  |
| SEC-002 | Moyenne | Gateway headers   | `Content-Security-Policy` absent                     | Réponse GET `/` sans CSP                        | Ajouter CSP minimale `default-src 'self'`    | À faire  |
| SEC-003 | Haute   | Dépendances       | vuln. `lodash@4.17.19`                               | `npm audit` HIGH                                | `npm update lodash`                          | En cours |

---

# Check-list rapide (à adapter à ton app)

* [ ] Auth : 401/403 corrects (invalid, expired, role).
* [ ] Autorisations fines (RBAC + propriété des ressources).
* [ ] Validation schémas (DTO / Zod / class-validator).
* [ ] CORS verrouillé sur tes domaines.
* [ ] Rate limiting sur endpoints publics/auth.
* [ ] Headers sécurité sur Gateway (`helmet`).
* [ ] Secrets non exposés (logs/réponses).
* [ ] `npm audit` / Snyk / Trivy / Gitleaks propres.
* [ ] (Optionnel) DAST ZAP sans findings critiques.

Si tu veux, dis-moi un endpoint sensible de ton API (ex: `/admin/users`, `/orders/:id`) et je te rédige les tests e2e NestJS exacts avec `supertest` + ton guard de rôles.
