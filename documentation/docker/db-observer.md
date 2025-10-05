# 🖥️ UI MySQL (multi-serveurs) – phpMyAdmin

Nous utilisons **phpMyAdmin** (image `lscr.io/linuxserver/phpmyadmin`) comme interface web pour administrer nos bases **MySQL**.
L’objectif est d’avoir **un seul point d’accès** permettant de gérer plusieurs serveurs MySQL en même temps (auth, product, config, facturation, delivery).

---

## ⚙️ Configuration Docker

```yaml
phpmyadmin:
  image: lscr.io/linuxserver/phpmyadmin:latest
  container_name: phpmyadmin
  restart: always
  depends_on:
    - mysql-auth
    - mysql-product
    - mysql-config
    - mysql-facturation
    - mysql-delivery
  environment:
    PUID: "1000"
    PGID: "1000"
    TZ: "Europe/Paris"
    PMA_HOSTS: "mysql-auth,mysql-product,mysql-config,mysql-facturation,mysql-delivery"
    PMA_VERBOSES: "AUTH,PRODUCT,CONFIG,FACTURATION,DELIVERY"
    PMA_USER: "root"
    PMA_PASSWORD: "password"
  ports:
    - "8080:80"
  networks:
    - private_net
    - public
```

---

## 🔑 Explications

* **Image** : `lscr.io/linuxserver/phpmyadmin` → version multi-arch (compatible x86 et ARM, utile sur Apple Silicon).
* **PMA_HOSTS** : liste des hôtes MySQL déclarés dans le compose.
* **PMA_VERBOSES** : noms lisibles affichés dans le menu de phpMyAdmin.
* **PMA_USER / PMA_PASSWORD** : identifiants par défaut utilisés pour se connecter à chaque base (ici `root/password`).
* **Ports** : exposé sur `http://localhost:8080`.
* **Réseaux** :

    * `private_net` → communication interne avec les conteneurs MySQL
    * `public` → exposition du port 8080 vers l’extérieur (à sécuriser si déployé en prod).

---

## 🚀 Utilisation

1. Lancer les services :

   ```bash
   docker compose up -d phpmyadmin
   ```
2. Ouvrir [http://localhost:8080](http://localhost:8080).
3. Sélectionner le serveur voulu (AUTH, PRODUCT, CONFIG, FACTURATION, DELIVERY).
4. phpMyAdmin utilisera automatiquement `root/password` pour se connecter.

---

## ⚠️ Notes de sécurité

* **Éviter l’usage du compte root** en production : créer un utilisateur `pma_admin` avec droits limités par base.
* Si le service est exposé publiquement :

    * Mettre un **reverse proxy** (Nginx/Traefik) avec **authentification basique**.
    * Restreindre l’accès par IP si possible.

---

👉 Résultat : une seule interface web pour visualiser et gérer toutes nos bases MySQL, sans devoir relancer plusieurs outils ni se reconnecter à chaque changement de serveur.
