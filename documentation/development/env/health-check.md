← [Retourner au sommaire] [summary]

# 🔭 Env Health Check

Étant donné la multitude de variables d’environnement utilisées dans l’application, un contrôle automatique est effectué au démarrage de chaque service (dans le fichier `main.ts`).

Ce check vérifie que toutes les variables définies dans `configEnv` sont bien présentes.  
Le fichier `configEnv.ts` sert de **point de référence unique** : il indique clairement **les variables essentielles** au bon fonctionnement du service.

Si l’une d’elles est manquante, une erreur explicite est levée, ce qui permet de l’identifier immédiatement dans les logs et d'éviter tout comportement inattendu en runtime.

Pour le moment le front ne possede pas de env health check donc il faudra penser a etudier la question.

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

[summary]: ../../../README.md
