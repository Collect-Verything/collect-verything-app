<br />
<div align="center">
  <a href="https://github.com/Collect-Verything/">
    <img src="front-app/public/assets/logo/main-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Collect & Verything</h3>

  <p align="center">
    <a href="https://github.com/Collect-Verything">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>📚 Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project was undertaken as a personal study and research. Please note that some components may not be aligned with best practices. I draw the attention of those considering using this project for commercial purposes to this consideration.

I'm open to any tips, tricks, or warnings you might have to share, in the interest of further enriching this project.

As part of this project, my goal is to implement the essential functionalities of a modern online store. Here are the features I plan to implement:

<!-- FEATURES -->

## ✨ Features

### 🛍️ Core Features

- **🗂️ Product Catalog**  
  Navigation fluide et présentation claire des produits avec leurs détails complets, incluant prix, stock, statut de publication, et type (produit ou service).

- **🛒 Shopping Cart**  
  Ajout, modification et suppression d’articles en temps réel dans un panier accessible à tout moment.

- **📦 Order Workflow**  
  Processus de commande simple, fluide et intuitif, avec gestion dynamique du stock à chaque validation de commande.

- **💳 Secure Payment Integration**  
  Paiement en ligne sécurisé via Stripe, avec support des cartes bancaires (Visa, MasterCard) et mode abonnement pour les services.

- **📁 Order & Invoice Management**  
  Historique des commandes avec génération de factures, téléchargement PDF et accès aux reçus via Stripe.

- **👤 User Management**  
  Création de compte, authentification sécurisée JWT, rôles utilisateurs (admin, support, facture, etc.), et gestion des profils.

- **🔍 Admin Dashboard**  
  Tableau de bord avec filtres et recherches avancées pour trier les utilisateurs, produits ou commandes selon différents critères.

- **📬 Email Notifications**  
  Envoi automatique d'e-mails pour l'inscription, la réinitialisation du mot de passe, la confirmation de commande, et la facturation (via microservice RabbitMQ + Nodemailer).

- **🌓 Light / Dark Mode**  
  Interface utilisateur personnalisable selon les préférences visuelles de l'utilisateur.

- **📢 Mail Alerts & Newsletters**  
  Système d’alerte par e-mail lors d’évènements importants et campagnes marketing (newsletter).

### 🎁 Bonus Features:

- **🔔 Smart Notifications**  
  Système d’alertes par email et/ou notifications push pour informer les utilisateurs des mises à jour de commande, des offres promotionnelles ou des événements importants.

- **⭐ Reviews & Ratings (à venir)**  
  Possibilité future de laisser des avis et des notes sur les produits pour améliorer l'expérience client.

- **📝 Reviews & Ratings (à venir)**  
  Possibilité pour les utilisateurs de laisser des avis textuels et des notes sur les produits achetés afin d’enrichir l’expérience communautaire.

- **🌍 Multilingual Support** _(prévu)_  
  Interface traduite dans les langues les plus courantes : anglais, français, espagnol, allemand, mandarin, japonais, arabe, portugais, russe, hindi.

- **🌗 Light/Dark Mode**  
  Personnalisation complète de l’interface utilisateur selon les préférences visuelles : mode clair ou sombre.

- **🎯 Loyalty Program** _(prévu)_  
  Programme de fidélité offrant des récompenses et réductions aux clients réguliers.

- **🔐 Social Login** _(Google)_  
  Connexion simplifiée via Google pour accélérer l'inscription et améliorer l’accessibilité.

- **🧠 Personalized Recommendations** _(à venir)_  
  Recommandations de produits dynamiques basées sur l’historique de navigation et d’achat.

- **📱 Social Media Integration**  
  Partage facile de produits sur les réseaux sociaux, avec prévisualisation adaptée.

- **💬 Live Chat Support** _(prévu)_  
  Système de support client en temps réel intégré pour répondre rapidement aux questions des utilisateurs.

- **🚚 Flexible Shipping Options**  
  Choix multiples de livraison avec estimation du délai et suivi en temps réel (selon intégration future).

- **❓ FAQ Page**  
  Accès à une page de questions fréquentes pour accompagner les utilisateurs dans leur parcours d’achat.

- **🤝 Affiliate Program** _(prévu)_  
  Mise en place d’un système d’affiliation permettant aux utilisateurs de générer des revenus via des recommandations.

- **⚡ Flash Sales & Promotions**  
  Gestion des ventes flash, promotions ponctuelles et codes de réduction.

- **📱 Mobile Optimization / App (en réflexion)**  
  Expérience utilisateur optimisée pour mobile, avec possibilité future d’application mobile dédiée.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILT WITH -->

## 🛠 Built With

- [![NestJs][NestJs]][Next-url]
- [![Prisma][Prisma]][Prisma-url]
- [![Docker][Docker]][Docker-url]
- [![MySql][MySql]][MySql-url]
- [![React][React.js]][React-url]
- [![Npm][Npm]][Npm-url]
- [![Mui][Mui]][Mui-url]
- [![RabbitMQ][Rabbit-MQ]][RabbitMQ]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Since the application is a study project, all the specific .env and configuration files are included in the repository. Therefore, when you git clone it, all the files needed to launch the application are already present.

But for your information here is the composition of the .env files needed for the project

### 📦 Prerequisites

- Node.js (v20 recommended)
- Docker
- [Read The Fucking Documentation] [rtfm]

### 📁 Installation

```bash
git clone https://github.com/Collect-Verything/collect-verything
cd collect-verything
npm install
```

### 🧪 Database `.env` Samples

Before launching the applications, you must create the .env in the root then the .env in each service

The .env in the root contains ports and url's of each service:

```dotenv
DOMAIN=localhost
#etc...
```

Since React doesn't support .env files outside of its own folder, it's necessary to place an .env file directly in the root directory of the React application. Additionally, each environment variable must be prefixed with REACT*APP* to be accessible in the code.

```dotenv
REACT_APP_DOMAIN=localhost
#etc...
```

- Auth:

```env
DATABASE_URL="mysql://user:password@localhost:3306/collect-verything-auth?schema=public"
```

- Facturation:

```env
DATABASE_URL="mysql://user:password@localhost:3306/collect-verything-facture?schema=public"
```

- Product:

```env
DATABASE_URL="mysql://user:password@localhost:3306/collect-verything-product?schema=public"
```

- Config:

```env
DATABASE_URL="mysql://user:password@localhost:3306/collect-verything-config?schema=public"
```

For the rest, you can read the documentation about the environment.[Here][rtfm]

## ▶️ Usage

```bash
docker compose up
#If you need logs
docker compose up 2>&1 | tee logs-compose-up.txt
```

It is therefore possible to launch a single service or to setup the basis of a single service by referring to the existing script

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing

Any contributions, bug reports, or feature requests are welcome. Feel free to fork and open a PR.

1. Fork the repo
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## 📄 License

Distributed under the Creative Commons Legal Code License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## 📬 Contact

- Canse – [GitHub](https://github.com/CanseFr)
- Baptiste – [GitHub](https://github.com/titoon57)
- Thomas – [GitHub](https://github.com/ThomasStibling)
- Ishak – [GitHub](https://github.com/Ishak-rav)

---

<p align="center">Made with ❤️ by the Collect & Verything team.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[NestJs]: https://img.shields.io/badge/nestJs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-000000?style=for-the-badge&logo=vite&logoColor=e6d92e
[Vite-url]: https://vitejs.dev/
[Turbo]: https://img.shields.io/badge/Turbo-000000?style=for-the-badge&logo=turbo&logoColor=d93dc7

[Turbo-url]: [https://vitejs.dev/](https://turbo.build/)https://turbo.build/
[Prisma]: https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=prisma&logoColor=8052ab
[Prisma-url]: https://www.prisma.io/
[MySql]: https://img.shields.io/badge/MySql-000000?style=for-the-badge&logo=MySql&logoColor=de7a16
[MySql-url]: https://www.mysql.com/fr/
[Docker]: https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=Docker&logoColor=150c91
[Docker-url]: https://www.docker.com/
[Npm]: https://img.shields.io/badge/Npm-000000?style=for-the-badge&logo=Npm&logoColor=ed0000
[Npm-url]: https://www.npmjs.com/
[Mui]: https://img.shields.io/badge/Mui-000000?style=for-the-badge&logo=Mui&logoColor=3d4ee3
[Mui-url]: https://www.npmjs.com/
[Rabbit-MQ]: https://img.shields.io/badge/rabbitmq-000000?style=for-the-badge&logo=rabbitmq&logoColor=de7a16
[RabbitMQ]: https://www.RabbitMQ.com/

[Auth Read.Me]: auth-service/README.md
[rtfm]: documentation/README.md
