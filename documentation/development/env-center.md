← [Retourner au sommaire] [summary]


# 🏥 Node Env Poke-Center

Étant donné le nombre de services et de paires clé/valeur utilisées pour nos variables d’environnement, ce fichier a pour but de **recenser toutes les variables nécessaires au projet**.

👉 Dès qu’une nouvelle variable est ajoutée quelques part dans l'application, **quelle qu’en soit la raison**, il est impératif de la référencer ici.  
Cela évitera toute confusion ou oubli susceptible de hanter vos nuits de développement 🧛🏻‍♂️.

👉 Il permet également de garantir une **cohérence entre les services**, notamment lorsque plusieurs d’entre eux partagent les mêmes variables (ex. : ports, URLs, clés d’accès, etc.).

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
STRIPE_API_KEY=sk_test_VfGNimRoo2iCC7QIRyKnY3sc

DOMAIN_FACTURATION=facturation-service

FACTURATION_PORT=3003
FACTURATION_URL=stripe

DOMAIN_CONFIG=config-service

CONFIG_PORT=3004
CONFIG_URL=subscription

EMAIL_MESSAGE_BROKER=collectverythings@gmail.com
PASSWORD_MESSAGE_BROKER="zcbq wkpq zfew edtd"
EMAIL_QUEUE=mail-queue
EMAIL_SERVICE=gmail
FORGOT_PASSWORD_PATTERN=forgot-password

MESSAGE_BROKER_URL=broker-service
```

[summary]: ../README.md
