<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <strong>Mail Service</strong> – Microservice de gestion des e-mails transactionnels de l’application <code>Collect & Verything</code>.
</p>

---

## 📬 Description

Ce microservice reçoit des messages via RabbitMQ et envoie des e-mails à l’utilisateur.  
Il est principalement utilisé pour la **réinitialisation de mot de passe**.

### Fonctionnalités :
- Réception d’un message `forgot-password` via RabbitMQ.
- Envoi d’un e-mail contenant un **mot de passe temporaire** au format HTML.
- Utilisation de `nodemailer` avec une boîte Gmail ou autre service compatible SMTP.

---

## ⚙️ Prérequis

- RabbitMQ (broker configuré via `.env` ou `configEnv.ts`)
- Adresse e-mail et mot de passe application (Gmail ou autre)
- Environnement NestJS

---

## 🛠 Installation

```bash
npm install
```

---

## 🚀 Démarrer le service

### En développement :

```bash
npm run start:dev
```

### En production :

```bash
npm run start:prod
```

### Avec Docker :

```bash
docker build -t mail-service .
docker run -p 3003:3003 mail-service
```

> 💡 Le service écoute uniquement les messages RabbitMQ, aucun port HTTP n’est exposé par défaut.

---

## 📩 Envoi d’un mot de passe oublié

Le service écoute l’événement suivant :

```ts
@EventPattern(configEnv.FORGOT_PASSWORD_PATTERN)
```

### Payload attendu :
```ts
{
  email: string;
  password: string;
}
```

Un e-mail HTML personnalisé est envoyé à l’adresse spécifiée.

---

## 🛠 Configuration

La configuration se fait via `env-config.ts` ou `.env` :

```ts
export const configEnv = {
  EMAIL_SERVICE: 'gmail',
  EMAIL_MESSAGE_BROKER: 'xxx@gmail.com',
  PASSWORD_MESSAGE_BROKER: 'your-app-password',
  FORGOT_PASSWORD_PATTERN: 'forgot-password',
  MESSAGE_BROKER_URL: 'broker-service',
  EMAIL_QUEUE: 'mail-queue',
};
```

> 💡 Pour Gmail, activez l’authentification à deux facteurs et générez un mot de passe d’application.

---

## 🧪 Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

---

## ✅ To Do

- [ ] Ajouter un lien avec token pour réinitialisation directe.

---

## 🧠 Astuce

Pour tester en local sans RabbitMQ, vous pouvez directement appeler `sendForgotPassword()` depuis un contrôleur HTTP temporaire.

---

## 📝 License

MIT
