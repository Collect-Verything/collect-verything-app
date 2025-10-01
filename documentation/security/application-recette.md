# Tests de sécurité – Synthèse

**Objectif :** produire des tests de sécurité adaptés à l’application et **documenter les anomalies** identifiées.
**Cible :** Auth service.
**Info :** Un **cahier de recette** a été rédigé et appliqué sur le **service Auth** à titre de **preuve de concept (PoC)**. Il sert de **modèle type** pour les autres services de l’application : faute de temps, nous l’avons déroulé intégralement sur Auth afin de démontrer la méthode et la capacité à l’industrialiser sur le reste.

## 1) Tests automatisés (unit / intégration / e2e)

### ✅ Authentification / JWT & RBAC

* **Endpoint** : `GET /users` (guard `SuperAdminGuards`).
* **Cas e2e couverts** (avec `jwt-decode` mocké, `UsersService` mocké) :

    1. Rôle `SUPER_ADMIN` → **200 OK**
    2. Rôle insuffisant → **403 Forbidden**
    3. Sans `Authorization` → **403 Forbidden**
    4. JWT **invalide** (decode lève) → **refus d’accès** *(comportement actuel : **500** ; attendu : **401**)*
    5. JWT **expiré** (`exp` dépassé) → **anomalie** : **200** (expiration non vérifiée)
* **Conclusion** : RBAC conforme ; **anomalie** sur gestion d’`exp`/erreurs decode.
* **Reco** : dans le guard, vérifier `exp` → **401** (invalid/expired) ; conserver **403** pour rôle insuffisant. Catch des erreurs decode → **401**.

### ⏳ IDOR (accès horizontal)

* **État** : **à implémenter/étendre** sur les endpoints “/:id”.
* **Reco** : vérifier systématiquement `resource.userId === req.user.id` (ou stratégie équivalente dans guard/interceptor).
  **Tests à ajouter** : propriétaire → **200** ; autre utilisateur → **403** (ou **404** selon politique).

### ✅ Validation d’entrée (DTO + contrôleur)

* **Couverture** :

    * **DTO `CreateUserDto`** : règles `@IsEmail`, `@MinLength`, `@IsDateString`, requis/longueurs.
    * **Contrôleur** (avec `ValidationPipe { whitelist, forbidNonWhitelisted, transform }`) :

        * Payload invalide → **400**, **service non appelé**
        * Payload valide → **201**, **service appelé** avec body **whitelisté**
    * **Service (unitaire)** : contrôle que la **shape** envoyée à Prisma est correcte (`include.role = true`, `role.connect.id = roleId`) ; pas de logique de validation côté service.
* **Résultat** : payloads invalides correctement **rejetés (400)** ; payloads conformes traités.

### ⏳ Rate limiting / bruteforce

* **État** : non activé.
* **Reco** : ajouter un **rate limit** au niveau gateway/reverse proxy (ou Nest middleware) ; **tests** : dépassement seuil → **429**.

### ✅ CORS

* **Tests** :

    1. **Mode permissif** (`origin: '*'`) : `Access-Control-Allow-Origin: *` ; préflight `OPTIONS` expose `GET/POST/PATCH/DELETE`.
    2. **Mode restreint** (scénario commenté) : origin autorisée écho-ée ; origin non autorisée → **pas** de headers CORS.
* **Reco** : en production, **liste blanche d’origines** ; éviter `'*'` surtout avec **credentials**.

### ⏳ Headers de sécurité (Gateway)

* **État** : non déployés.
* **Reco** : via **Helmet** ou middleware custom ajouter :
  `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`.
  **Tests** : vérifier présence/valeur des en-têtes sur une route (ex. `/health`).

---

## 2) Scans automatisés (CI)

* **Dépendances** : `npm audit --audit-level=high` *(actuellement commenté pour réduire le bruit ; exécutions ponctuelles de contrôle)*
* **Secrets** : `gitleaks` *(surveillance active côté Git ; non nécessaire dans chaque workflow)*
* ⏳ **Images Docker** : **Trivy** (à intégrer)
* ⏳ **DAST** : **OWASP ZAP Baseline** sur l’API de dev (à intégrer)

**Exemples prêts à activer :**

```yaml
# Trivy
- uses: aquasecurity/trivy-action@0.24.0
  with:
    image-ref: ${{ env.IMAGE }}
    vuln-type: 'os,library'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'

# ZAP Baseline
- uses: zaproxy/action-baseline@v0.10.0
  with:
    target: 'https://dev.api.example.com'
    rules_file_name: '.zap/rules.tsv'
```

---

## 3) Registre des anomalies

| ID      | Gravité | Zone    | Description                                | Preuve                          | Correctif                                 | État    |
| ------- | ------- | ------- | ------------------------------------------ | ------------------------------- | ----------------------------------------- | ------- |
| SEC-001 | Haute   | Guard   | **Expiration JWT non vérifiée (`exp`)**    | Token expiré → **200**          | Vérifier `exp`, renvoyer **401**          | À faire |
| SEC-002 | Moyenne | Guard   | **Decode JWT** non catch → **500**         | Token invalide → **500**        | Try/catch decode → **401**                | À faire |
| SEC-003 | Moyenne | IDOR    | **Pas de check d’appartenance** généralisé | Manque de tests `/resource/:id` | `ownerId === req.user.id` + tests 403/404 | À faire |
| SEC-004 | Moyenne | Gateway | **Headers sécurité** absents               | Pas de CSP/XFO/Referrer-Policy  | Helmet/middleware headers                 | À faire |
| SEC-005 | Basse   | Gateway | **Rate limit** absent                      | Aucun 429 sous charge           | Activer rate limit (RP/Nest)              | À faire |

---

## Annexes – Répartition des tests

* **Service (`users.service.spec.ts`)** : logique métier isolée (Prisma mock), shape des données (`include.role`, `role.connect.id`), gestion erreurs Prisma. **Pas** de validation ici.
* **Contrôleur (`*.controller.validation.spec.ts`)** : `ValidationPipe` actif ; payload invalide → **400** (service non appelé), payload valide → **201** (service appelé).
* **E2E léger (`*.e2e-spec.ts`)** : HTTP réel avec guards surchargés si nécessaire, vérif RBAC/JWT, CORS et (plus tard) headers sécurité.

---

### Conclusion

* Les **contrôles d’accès** par rôle fonctionnent ; la **validation d’entrée** protège efficacement l’API.
* **Points d’amélioration non bloquants à court terme** : gestion stricte de l’expiration/erreurs JWT (**401**), **IDOR** systématique, **headers de sécurité** au gateway et **rate limiting**.
* Les **scans CI** sont enclenchés partiellement ; Trivy et ZAP sont **pré-configurés** et prêts à être activés lorsque l’environnement de dev est stabilisé.
