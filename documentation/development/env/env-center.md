← [Retourner au sommaire] [summary]

# 🏥 Node Env Poke-Center

Ce fichier a pour but de **recenser toutes les variables nécessaires au projet**.

👉 Dès qu’une nouvelle variable est ajoutée quelques part dans l'application, **quelle qu’en soit la raison**, il est impératif de la référencer ici.  
Cela évitera toute confusion ou oubli susceptible de hanter vos nuits de développement 🧛🏻‍♂️.

👉 En cas de doute, le README de chaque service contient également la liste des variables d’environnement (key/value) nécessaires à son fonctionnement à condition qu’il soit bien à jour, bien sûr... 👨🏻‍🎨

### Api GateWay / Reverse Proxy

Ne necessite aucun env pour le moment

### AUTH Service

```dotenv
DATABASE_URL=> Url de la base de donnée du service
JWT_SECRET=> Secret de hasing pour le jwt token
ROUND_OF_HASHING=> Nombre de couche de hash
```

### CONFIG Service

```dotenv
DATABASE_URL=> Url de la base de donnée du service
STRIPE_API_KEY=> Clé Api de votre compte Stripe test ou prod
```

### DELIVERY Service

```dotenv
DATABASE_URL=> Url de la base de donnée du service
```

### FACTURATION Service

```dotenv
DATABASE_URL=> Url de la base de donnée du service
STRIPE_API_KEY=> Clé Api de votre compte Stripe test ou prod
```

### PRODUCT Service

```dotenv
DATABASE_URL=> Url de la base de donnée du service
```

### MAIL Service

```dotenv
EMAIL_SENDER=> Adresse email de votre compte expediteur
EMAIL_PASSWORD=> Mot de passe app de ce compte
EMAIL_SERVICE=> Nom de vtre provider 
```

[summary]: ../../../README.md
