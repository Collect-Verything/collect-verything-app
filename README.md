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
  <summary>Table of Contents</summary>
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

## Features 

### Basic features:

- **Product catalog**: Clear display of products with detailed information.

- **Shopping cart**: Easy addition, modification and deletion of products in the cart.

- **Ordering process**: Simple and intuitive ordering steps.

- **Secure payment options**: Integration of secure online payment methods: Visa & paypal with stripe.

- **Order management system**: Order tracking, invoice, transaction history & PDF Export.

- **User management**: Registration, connection, and management of user accounts.

- **Admin Filtering and Search**: Advanced search features and filters to help users find user quickly.

- **Rating and Review System**: Allows customers to leave comments and ratings on products.

- **Notifications**: Email alerts or push notifications for order updates, promotions, etc.

- **Multi-language Support**: English, Spanish, French, German, Mandarin, Japanese, Arabic, Portuguese, Russian, Hindi, Japanese.

- **Light/Dark mode**: Customizing the UI.

- **Mail Alert** : On registration, forgot password, news letter & invoice confirmation.


### Little extras:

- **Loyalty Program**: Rewards for loyal customers.

- **Register/Login** : With Google.

- **Personalized Recommendations**: Product suggestions based on purchase history.

- **Social Media Integration**: Easy sharing of products on social media.

- **Live**: Real-time chat support to answer customer questions, alert.

- **Flexible Shipping Options**: Choice of different shipping options and real-time tracking.

- **FAQ Page**: Answers to frequently asked questions.

- **Affiliate Programs**: Allows users to earn commissions by recommending products.

- **Flash sales and promotions**: Special offers and temporary discounts.

- **Mobile application**: Mobile version of the site or dedicated application.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILT WITH -->
### Built With

* [![NestJs][NestJs]][Next-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Docker][Docker]][Docker-url]
* [![MySql][MySql]][MySql-url]
* [![React][React.js]][React-url]
* [![Npm][Npm]][Npm-url]
* [![Mui][Mui]][Mui-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before launching the applications, you must create the .env in the root then the .env in each service

The .env in the root contains ports and url's of each service:
```env
# URL AND PORT

DOMAIN='localhost'
FRONT_PORT=3000

API_GATEWAY_PORT=2999

AUTH_PORT=3001
AUTH_URL_AUTH='auth'
AUTH_URL_ROLES='roles'
AUTH_URL_USERS='users'

PRODUCT_PORT=3002
PRODUCT_URL='products'

FACTURATION_PORT=3003
FACTURATION_URL='stripe'

CONFIG_PORT=3004
CONFIG_URL='subscription'
```

The env points of each service include the url of the database of each service, with your personalized information

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

Once the .env is created, it is now enough to install the dependencies of all the services with the command present in the package.json
```sh
npm run install:all
```

Then generate, create the database and seed the dataset of all services with the following command:
```bash
 npm run db:all
```

Now that everything is setup, just launch all the applications at the same time with the following command:
```bash
npm run start:dev
```

## Docker

If you all want to run it all at once via docker you can run the following command without forgetting to create the .env:

```bash
docker compose up
```

### Issue 
No matching manifest for linux/arm64/v8 in the manifest list entries
```
docker pull --platform linux/amd64 cansefr/front-app:latest
```

## Just Run the App

If you just want to download the Docker images and run the app without cloning the source code or using any development tools, you can do the following:

### Pull images
```zsh
scripts/pull-images.sh

# 💡 On Apple Silicon (M1/M2 or ARM64):
scripts/pull-images.sh -arm64
```

## Unit launch

Previously we saw how to setup and launch the entire application, but you can do it individually. To do this you can look at the package.json file and consult the command available in each section, they are logically grouped by package as follows:
```bash
        "__INSTALL__": "",
#        ... Unit installation script

#        ... Globalized installation script

        "__FRONT__": "",
#        ... Front launch script

        "__AUTH__": "",
#        ... Auth service launch script

#        ... Script to setup auth database

        "__DATABASE__": "",
#        ... Script for base setup and seed of all services

        "__START__": "",
#        ... Script to launch all apps

```

It is therefore possible to launch a single service or to setup the basis of a single service by referring to the existing script


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Creative Commons Legal Code License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Canse - Link: [Github](https://github.com/CanseFr)

Baptiste - Link: [Github](https://github.com/titoon57)

Thomas - Link: [Github](https://github.com/ThomasStibling)

Ishak - Link: [Github](https://github.com/Ishak-rav)


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

[Auth Read.Me]: auth-service/README.md