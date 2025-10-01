# Brouillon et check list => “tests de sécurité”

### Objectif: Le candidat produit les tests de sécurité adaptés à l’application et documente les anomalies identifiées.

1. **Tests automatisés** (unit/integration/e2e) qui prouvent que :

    * [x] Authentification / JWT : on refuse les tokens invalides/expirés, on applique bien les rôles.
    * [x] Autorisations (RBAC) : un user sans rôle admin ne peut pas accéder aux routes admin (ni en lecture, ni en écriture).
    * [!] Pas d’accès horizontal (IDOR) : un user A ne peut pas lire les données de B en changeant un ID dans l’URL.
    * [x] Validation d’entrée : les payloads invalides sont rejetés (types, tailles, schémas).
    * [!] Rate limiting / bruteforce : l’API bloque au-delà d’un seuil.
    * [x] CORS correctement verrouillé (origines autorisées seulement).
    * [!] Headers de sécurité (sur Gateway) : `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, etc.

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

commenté pour le moment pour eviter la pollution des log mais utilisé de temps en temp pour fair eun check

### Secrets (Gitleaks)

```yaml
- uses: gitleaks/gitleaks-action@v2
  with:
    config-path: .gitleaks.toml
```

Inclu dans les fonctionnalité de git directemetn sur toute les action donc pas necessaire a mettre dans le compose

### Docker (Trivy)

! axe amelioration

```yaml
- uses: aquasecurity/trivy-action@0.24.0
  with:
    image-ref: ${{ env.IMAGE }}
    vuln-type: 'os,library'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
```

### DAST (OWASP ZAP Baseline) sur l’API de dev
! axe amelioration

```yaml
- name: OWASP ZAP Baseline
  uses: zaproxy/action-baseline@v0.10.0
  with:
    target: 'https://dev.api.example.com'
    rules_file_name: '.zap/rules.tsv' # pour ignorer du bruit si besoin
```

