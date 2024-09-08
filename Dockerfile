# Utiliser une image de base commune
FROM node:20-alpine as auth-service

# Configurer le backend
WORKDIR /auth-service
COPY auth-service/package.json ./
RUN npm install
COPY auth-service .
EXPOSE 3001

# Construire l'application front-end
FROM node:16-alpine as front-app

WORKDIR /frontapp
COPY front-app/package.json ./
RUN npm install
COPY front-app .
EXPOSE 3000

# Lancer les deux services
CMD ["sh", "-c", "npm run --prefix /auth-service start:dev & npm run --prefix /frontapp start"]