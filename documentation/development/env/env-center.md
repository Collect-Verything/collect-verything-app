← [Retourner au sommaire] [summary]

# 🏥 Node Env Poke-Center

Étant donné le nombre de services et de paires clé/valeur utilisées pour nos variables d’environnement, ce fichier a pour but de **recenser toutes les variables nécessaires au projet**.

👉 Dès qu’une nouvelle variable est ajoutée quelques part dans l'application, **quelle qu’en soit la raison**, il est impératif de la référencer ici.  
Cela évitera toute confusion ou oubli susceptible de hanter vos nuits de développement 🧛🏻‍♂️.

👉 Il permet également de garantir une **cohérence entre les services**, notamment lorsque plusieurs d’entre eux partagent les mêmes variables (ex. : ports, URLs, clés d’accès, etc.).

👉 En cas de doute, le README de chaque service contient également la liste des variables d’environnement (key/value) nécessaires à son fonctionnement — à condition qu’il soit bien à jour, bien sûr... 👨🏻‍🎨

# Api Gateway

```dotenv
DOMAIN=localhost

FRONT_PORT=3000

API_GATEWAY_PORT=2999

DOMAIN_AUTH=auth-service

AUTH_PORT=3001
AUTH_URL_AUTH=auth
AUTH_URL_ROLES=roles
AUTH_URL_USERS=users

DOMAIN_PRODUCT=product-service

PRODUCT_PORT=3002
PRODUCT_URL=product

DOMAIN_FACTURATION=facturation-service

FACTURATION_PORT=3003
FACTURATION_URL=stripe

DOMAIN_CONFIG=config-service

CONFIG_PORT=3004
CONFIG_URL=subscription

DOMAIN_DELIVERY=delivery-service

DELIVERY_PORT=3005
DELIVERY_URL=delivery

```

# Auth Service

```dotenv
DATABASE_URL="mysql://root:password@mysql-auth:3306/auth_db?schema=public"

DOMAIN=localhost

API_GATEWAY_PORT=2999

FRONT_PORT=3000

AUTH_PORT=3001
AUTH_URL_AUTH=auth
AUTH_URL_ROLES=roles
AUTH_URL_USERS=users

FORGOT_PASSWORD_PATTERN=forgot-password
MESSAGE_BROKER_URL=broker-service
EMAIL_QUEUE=mail-queue
```

# Config Service

```dotenv
DATABASE_URL="mysql://root:password@mysql-config:3306/config-db?schema=public"

DOMAIN=localhost

FRONT_PORT=3000

CONFIG_PORT=3004
CONFIG_URL=subscription

STRIPE_API_KEY=sk_test_VfGNimRoo2iCC7QIRyKnY3sc

```

# Delivery Service

```dotenv
DOMAIN=localhost
DATABASE_URL="mysql://root:password@mysql-delivery:3306/delivery-db?schema=public"

FRONT_PORT=3000

DELIVERY_PORT=3005
DELIVERY_URL=delivery

```

# Facturation Service

```dotenv
DATABASE_URL="mysql://root:password@mysql-facturation:3306/facturation-db?schema=public"

DOMAIN=localhost

FRONT_PORT=3000

API_GATEWAY_PORT=2999

FACTURATION_PORT=3003
FACTURATION_URL=stripe

STRIPE_API_KEY=sk_test_VfGNimRoo2iCC7QIRyKnY3sc
```

# Front App

```dotenv
REACT_APP_DOMAIN=localhost

REACT_APP_FRONT_PORT=3000

REACT_APP_API_GATEWAY_PORT=2999


REACT_APP_DOMAIN_AUTH=auth-service

REACT_APP_AUTH_PORT=3001
REACT_APP_AUTH_URL_AUTH=auth
REACT_APP_AUTH_URL_ROLES=roles
REACT_APP_AUTH_URL_USERS=users


REACT_APP_DOMAIN_PRODUCT=product-service

REACT_APP_PRODUCT_PORT=3002
REACT_APP_PRODUCT_URL=product

REACT_APP_DOMAIN_FACTURATION=facturation-service

REACT_APP_FACTURATION_PORT=3003
REACT_APP_FACTURATION_URL=stripe

REACT_APP_DOMAIN_CONFIG=config-service

REACT_APP_CONFIG_PORT=3004
REACT_APP_CONFIG_URL=subscription

REACT_APP_DELIVERY_DOMAIN=delivery
REACT_APP_DELIVERY_PORT=3005

```

# Mail Service

```dotenv
EMAIL_MESSAGE_BROKER=collectverythings@gmail.com
PASSWORD_MESSAGE_BROKER="zcbq wkpq zfew edtd"
EMAIL_QUEUE=mail-queue
EMAIL_SERVICE=gmail
FORGOT_PASSWORD_PATTERN=forgot-password

MESSAGE_BROKER_URL=broker-service
```

# Product Service
```dotenv
DATABASE_URL="mysql://product:productpwd@mysql-product:3306/product-db"

DOMAIN=localhost

API_GATEWAY_PORT=2999

PRODUCT_PORT=3002
PRODUCT_URL=product
```

[summary]: ../../../README.md
