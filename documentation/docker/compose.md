← [Retourner au sommaire] [summary]


# Documentation technique — Priorités de démarrage & réseau (public/privé)

Cette doc décrit :

1. l’ordre de démarrage (priorités) des conteneurs,
2. l’architecture réseau (public vs privé),
3. un petit diagramme d’ensemble,
4. des conseils de santé (healthchecks) & dépannage.

---

## 1) Priorités de démarrage (ordre logique)

### Niveau 0 — Réseaux

* `public` : réseau frontal (navigateur → front-app → api-gateway).
* `private_net` (`internal: true`) : réseau interne isolé (microservices, bases, outils internes).

> Les réseaux se déclarent une seule fois dans `docker-compose.yml` (voir §4).

### Niveau 1 — Fondations

* **RabbitMQ (broker)** : service de messagerie.

    * **Healthcheck** obligatoire pour garantir qu’il est prêt avant les services qui en dépendent.
* **Bases MySQL** (`mysql-*`) : une par microservice.

    * **Aucun port exposé**.
    * **Healthcheck** obligatoire.

### Niveau 2 — Microservices (privés)

* `auth-service`, `product-service`, `config-service`, `facturation-service`, `delivery-service`, `mail-service`, etc.

    * **depends_on** la DB correspondante (condition `service_healthy`).
    * Le cas échéant, **depends_on** `broker-service` si le service utilise RabbitMQ (ex. `mail-service`).

### Niveau 3 — API Gateway (porte d’entrée API)

* Démarre **après** tous les microservices (condition `service_started`) et **après** un broker **healthy**.
* Connectée à **public** (pour recevoir les requêtes) et **private_net** (pour parler aux services).

### Niveau 4 — Front-end

* Démarre **après** la Gateway (condition `service_started`).
* Exposé au navigateur (port HTTP publié).

> Optionnel mais recommandé : ajouter aussi des **healthchecks HTTP** aux microservices et à la gateway (ex: `/health`) pour fiabiliser l’ordre.

---

## 2) Système de réseau (public / privé)

* **public (bridge)** : visible par l’hôte via des ports publiés (front & gateway).
* **private_net (bridge + `internal: true`)** : **inaccessible depuis l’hôte**, assure que seuls les conteneurs connectés peuvent communiquer.
* **Règle d’or** : *ne jamais publier* de ports pour les services internes (microservices et MySQL).
* **Adminer** : outil d’inspection DB **sur private_net**, exposé **en local uniquement** (`127.0.0.1`) pour consultation ponctuelle.

---

## 3) Diagramme d’ensemble (ASCII)

```
[ Navigateur ] 
     |
     v          (public)
  localhost ──────────────►  front-app:3000
                                |
                                v          (public + privé)
                           api-gateway:2999
                                |
             ┌──────────────────┼───────────────────┐
             v                  v                   v
        auth-service       product-service     config-service        ... (private_net)
             |                  |                   |
             v                  v                   v
        mysql-auth          mysql-product       mysql-config         ... (private_net)

                       (private_net)                 (private_net)
             mail-service  ───────────► broker-service (RabbitMQ)
                                                       ▲
                           (UI Admin en local)         │
       http://127.0.0.1:15672  ◄───────────────────────┘

                         (private_net, UI locale)
                     adminer  ◄── consulte toutes les DB privées
                      http://127.0.0.1:8081
```

* **Flèches publiques** : via ports exposés (front:3000, gateway:2999, rabbitMQ admin:15672, adminer:8081 en local).
* **Flèches privées** : tout le reste circule sur `private_net`.

## 4) Healthchecks HTTP (recommandé)

Pour fiabiliser l’ordre jusqu’au niveau “service prêt à répondre”, ajoutez un endpoint `/health` dans chaque service (NestJS : `@Controller('health')` + `GET /health`) puis :

```yaml
  auth-service:
    # ...
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3001/health"]
      interval: 5s
      timeout: 3s
      retries: 20
```

Ensuite, remplacez dans `api-gateway.depends_on` chaque
`condition: service_started` par `condition: service_healthy`.

> Il faut que l’image contienne `wget` ou `curl`. Sinon, créez une petite commande Node ou ajoutez `apk add --no-cache curl` (images Alpine).

---

## 6) Bonnes pratiques & sécurité

* **Ne jamais publier** les ports MySQL et des microservices internes.
* **RabbitMQ** : exposer **uniquement** l’UI admin et **en local** (`127.0.0.1`).
* **CORS** : autoriser le front (`http://localhost:3000`) sur la gateway.
* **Secrets** : remplacez `password` par des secrets/ENV sécurisés.
* **Production** : ne pas executer Adminer en continu, activer ponctuellement.

---

## 7) Dépannage rapide

* **Gateway ne répond pas** → vérifier que tous les services cibles sont **healthy**.
* **Adminer “Connection refused”** → vérifier que la DB ciblée est healthy et que le **hostname** est le nom du service (`mysql-auth`, etc.).
* **Un service ne démarre pas** → logs + vérifier l’URI de DB (host = *nom de service*, port 3306).
* **CORS** → ajuster la liste d’origines autorisées dans la gateway.

---

## 8) Check-list futur intégration

* [ ] CORS configuré sur la gateway pour le front
* [ ] Refacto le compose avec les ancres

[summary]: ../README.md
