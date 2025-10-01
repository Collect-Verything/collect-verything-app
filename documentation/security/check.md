# “tests de sécurité”

1. **Tests automatisés** (unit/integration/e2e) qui prouvent que :

    * [x] Authentification / JWT : on refuse les tokens invalides/expirés, on applique bien les rôles.
    * [x] Autorisations (RBAC) : un user sans rôle admin ne peut pas accéder aux routes admin (ni en lecture, ni en écriture).
    * [ ] Pas d’accès horizontal (IDOR) : un user A ne peut pas lire les données de B en changeant un ID dans l’URL.
    * [ ] Validation d’entrée : les payloads invalides sont rejetés (types, tailles, schémas).
    * [ ] Rate limiting / bruteforce : l’API bloque au-delà d’un seuil.
    * [ ] CORS correctement verrouillé (origines autorisées seulement).
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

```ts
it('GET /orders/:id → 403 si l’order n’appartient pas au user', async () => {
  const tokenA = await getUserJwt('userA');
  const orderB = await createOrderFor('userB');
  await request(app.getHttpServer())
    .get(`/orders/${orderB.id}`)
    .set('Authorization', `Bearer ${tokenA}`)
    .expect(403);
});
```

### 5) Validation d’entrée

```ts
it('POST /items → 400 si payload invalide', async () => {
  const admin = await getAdminJwt();
  await request(app.getHttpServer())
    .post('/items')
    .set('Authorization', `Bearer ${admin}`)
    .send({ price: 'abc' }) // invalide
    .expect(400);
});
```

### 6) Rate limiting

*(si activé au Gateway)*

```ts
it('GET /public → 429 au-delà du quota', async () => {
  const server = app.getHttpServer();
  for (let i=0; i<50; i++) await request(server).get('/public');
  await request(server).get('/public').expect(429);
});
```

### 7) CORS

```ts
it('CORS refuse une origin non autorisée', async () => {
  const res = await request(app.getHttpServer())
    .get('/public')
    .set('Origin', 'https://evil.example.com');
  expect(res.headers['access-control-allow-origin']).toBeUndefined();
});
```

## Front (React)

### 8) Pas de données sensibles en clair dans le DOM / logs

* Vérifier que les pages n’affichent jamais le token, et que les erreurs sensibles sont neutralisées.
* (Si possible) préférer `httpOnly` cookie côté API plutôt que `localStorage` pour le token. Si tu restes en `localStorage`, teste qu’il n’est jamais injecté dans le DOM.

```tsx
import { render, screen } from '@testing-library/react';
test('le token n’apparait jamais dans le DOM', () => {
  localStorage.setItem('token', 'abc.123.def');
  render(<YourApp />);
  expect(screen.queryByText(/abc\.123\.def/)).toBeNull();
});
```

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
