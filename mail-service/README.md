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

Ce projet utilise un fichier configEnv pour centraliser toutes les variables issues du .env, afin de faciliter le débogage et la gestion des configurations.

```
src/env-config.ts
```

Voici les variables d’environnement nécessaires au bon fonctionnement du service. Vous pouvez modifier les ports selon vos besoins, mais veillez à rester cohérent avec les fichiers .env du frontend et des autres services si vous utilisez l’application de manière globale.

Pour plus de simplicité, voici une configuration .env de base cohérente pour assurer le bon fonctionnement de l’ensemble des services.

```env
EMAIL_SENDER=votreUser@provider.com
EMAIL_PASSWORD="**** **** **** ****" //Mot de passe app 
EMAIL_SERVICE=provider
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

- [ ] Ajouter un lien avec token pour réinitialisation directe de mot de passe.

---

## 🧠 Astuce

Pour tester en local sans RabbitMQ, vous pouvez directement appeler `sendForgotPassword()` depuis un contrôleur HTTP temporaire.

---

## 📝 License

MIT
