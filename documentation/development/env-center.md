← [Retourner au sommaire] [summary]

# 🏥 Node Env Poke-Center

Étant donné le nombre de services et de paires clé/valeur utilisées pour nos variables d’environnement, ce fichier a pour but de **recenser toutes les variables nécessaires au projet**.

👉 Dès qu’une nouvelle variable est ajoutée quelques part dans l'application, **quelle qu’en soit la raison**, il est impératif de la référencer ici.  
Cela évitera toute confusion ou oubli susceptible de hanter vos nuits de développement 🧛🏻‍♂️.

👉 Il permet également de garantir une **cohérence entre les services**, notamment lorsque plusieurs d’entre eux partagent les mêmes variables (ex. : ports, URLs, clés d’accès, etc.).

👉 En cas de doute, le README de chaque service contient également la liste des variables d’environnement (key/value) nécessaires à son fonctionnement — à condition qu’il soit bien à jour, bien sûr... 👨🏻‍🎨

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

DELIVERY_PORT=3005
DELIVERY_URL=delivery
```

# 🔭 Env Health Check

Étant donné la multitude de variables d’environnement utilisées dans l’application, un contrôle automatique est effectué au démarrage de chaque service (dans le fichier `main.ts`).

Ce check vérifie que toutes les variables définies dans `configEnv` sont bien présentes.  
Le fichier `configEnv.ts` sert de **point de référence unique** : il indique clairement **les variables essentielles** au bon fonctionnement du service.

Si l’une d’elles est manquante, une erreur explicite est levée, ce qui permet de l’identifier immédiatement dans les logs et d'éviter tout comportement inattendu en runtime.

Ci-dessous, la méthode utilisée pour rendre ce diagnostic plus lisible et systématique :

```ts
export const configEnv = {
  EMAIL_MESSAGE_BROKER: process.env.EMAIL_MESSAGE_BROKER,
  //...
};

export const checkEnvValue = () => {
  console.log('✅ Checking env variables...');

  const listUndefinedValue: string[] = [];

  Object.keys(configEnv).forEach((key) => {
    if (!configEnv[key as keyof typeof configEnv]) {
      listUndefinedValue.push(key);
    }
  });

  if (listUndefinedValue.length > 0) {
    throw new Error(
      `🚨 Missing environment variables in MAIL SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
```

[summary]: ../README.md
