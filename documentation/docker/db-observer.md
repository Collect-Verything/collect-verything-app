← [Retourner au sommaire] [summary]


# Documentation — Adminer dans Docker Compose (avec sélection de bases)

Cette documentation explique **comment est intégré Adminer** à notre stack Docker pour **inspecter les bases MySQL privées** sans exposer leurs ports, et **comment ajouter un plugin** pour disposer d’une **liste déroulante de serveurs** (bases) dans l’écran de login.

Avant, les ports étaient exposés publiquement, ce qui permettait de les consulter via les fenêtres d’observation de l’IDE. Mais l’objectif du projet est désormais d’encapsuler les services et leurs bases de données dans un réseau privé ; dans ce contexte, ce conteneur (Adminer) est la solution la plus adaptée.

---

## 🎯 Objectifs

* Offrir une **UI web locale** pour consulter les bases (Adminer).
* **Ne pas exposer** les ports MySQL (les DB restent sur un **réseau privé**).
* Permettre le **choix rapide du serveur** (mysql-auth, mysql-product, etc.) via un **plugin Adminer**.
* Conserver l’architecture réseaux :

    * `public` : Front + API Gateway (+ RabbitMQ admin UI si besoin).
    * `private_net` (internal) : Microservices + MySQL + Adminer.

---

## ✅ Prérequis

* Docker / Docker Compose
* Architecture de réseaux :

    * `public` (bridge)
    * `private_net` (bridge, `internal: true`)
* Services MySQL **sans** `ports:` publiés (réseau privé uniquement).

---

## 🗂️ Arborescence recommandée

```
.
├─ docker-compose.yml
├─ adminer-plugins/
│  └─ login-servers.php        # plugin pour la liste des serveurs
└─ init/                       # (optionnel) scripts d’init DB existants
```

> Le dossier `adminer-plugins/` est monté dans le conteneur Adminer pour activer les plugins.

---

## 🧩 Ajout d’Adminer dans `docker-compose.yml`

Ajout du service **sans exposer les DB**. Adminer est relié à `private_net` et publié **en local seulement**.

```yaml
services:
  adminer:
    image: adminer
    container_name: adminer
    restart: always
    ports:
      - "127.0.0.1:8081:8080"  # UI web accessible uniquement depuis la machine locale
    environment:
      ADMINER_DEFAULT_SERVER: mysql-auth  # serveur affiché par défaut (facultatif)
      # ADMINER_DESIGN: pepa-linha        # thème (facultatif)
    volumes:
      - ./adminer-plugins:/var/www/html/plugins-enabled
    networks:
      - private_net

networks:
  public:
    driver: bridge
  private_net:
    driver: bridge
    internal: true
```

* **Pourquoi `127.0.0.1` ?** Pour limiter l’accès à la machine locale (conseillé en dev).
* **Pourquoi `private_net` ?** Adminer “voit” toutes les DB privées, sans que leurs ports soient exposés à l’hôte.

---

## 🧠 Plugin : liste déroulante des serveurs

Créez le fichier `adminer-plugins/login-servers.php` :

```php
<?php
// Plugin "LoginServers" : ajoute un menu déroulant des serveurs sur l'écran de login Adminer.
class AdminerLoginServers {
  function loginFormFields(&$fields) {
    $servers = [
      'mysql-auth'         => 'mysql-auth',
      'mysql-product'      => 'mysql-product',
      'mysql-config'       => 'mysql-config',
      'mysql-facturation'  => 'mysql-facturation',
      'mysql-delivery'     => 'mysql-delivery',
      // Ajoutez ici d'autres serveurs si besoin (ex: Postgres)
    ];
    $options = "";
    $current = $_GET['server'] ?? '';
    foreach ($servers as $label => $host) {
      $sel = ($current === $host) ? ' selected' : '';
      $options .= "<option value=\"$host\"$sel>$label</option>";
    }
    // Remplace le champ 'server' par un select HTML.
    $fields['server']['value'] = "<select name='server' id='server'>$options</select>";
  }
}
return new AdminerLoginServers();
```

> Tous les fichiers présents dans `plugins-enabled/` sont chargés automatiquement par l’image officielle Adminer — aucune autre config nécessaire.

---

## ▶️ Démarrage

```bash
docker compose up -d adminer
```

Puis ouvrez votre navigateur sur :
`http://127.0.0.1:8081`

* **Server** : choisissez dans la liste (ex. `mysql-auth`).
* **Username / Password** : ceux du service (ex. `root` / `password`, à adapter).
* **Database** : laissez vide pour voir toutes les DB visibles par l’utilisateur.

---

## 🔐 Bonnes pratiques sécurité

* **N’exposez pas** les ports MySQL dans Compose (`ports:` supprimés).
* Laissez Adminer **uniquement** sur `127.0.0.1` en dev.
* En prod : ne lancez **pas** Adminer, ou mettez-le derrière un reverse proxy avec auth forte, ou activez-le ponctuellement.
* Préférez des **utilisateurs non-root** par service (droits minimaux).

    * Via variables d’env à la création (`MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`), ou
    * Via scripts SQL dans `./init` (ex. `CREATE USER ...; GRANT ... ON <db>.* TO ...;`).

---

## 🛠️ Variante : plusieurs Adminer spécialisés (optionnel)

Si vous préférez une URL par base :

```yaml
services:
  adminer-auth:
    image: adminer
    environment: { ADMINER_DEFAULT_SERVER: mysql-auth }
    ports: ["127.0.0.1:8082:8080"]
    networks: [private_net]

  adminer-product:
    image: adminer
    environment: { ADMINER_DEFAULT_SERVER: mysql-product }
    ports: ["127.0.0.1:8083:8080"]
    networks: [private_net]
```

---

## 🧪 Vérifications rapides

* **Adminer up** : `docker ps | grep adminer`
* **Réseau** : `docker network inspect <votre_projet>_private_net`
  Vérifiez que `adminer` et chaque `mysql-*` sont connectés.
* **Connexion DB** : sur l’écran Adminer, testez `Server = mysql-auth`, user/pass corrects.

---

## 🐞 Dépannage

* **“Connection refused” côté Adminer**

    * Le service MySQL cible n’est pas **healthy** : attendez son healthcheck OK.
    * Le service MySQL n’est pas sur `private_net`.
    * Mauvais **hostname** (doit être **exactement** le nom du service Docker : `mysql-auth`, etc.).
* **Adminer ne charge pas le plugin**

    * Vérifiez le **montage volume** : dossier `./adminer-plugins` existe et contient `login-servers.php`.
    * Droits de fichier ok, aucun BOM/erreur PHP.
* **Je veux voir plusieurs DB dans un même écran**

    * Adminer se connecte **à un serveur à la fois**. Changez de serveur via la liste ou ouvrez plusieurs onglets.


[summary]: ../README.md
