# Étape 1 : Build du front      # Check previous config docker comose
#FROM node:18-alpine AS build
#
#WORKDIR /app
#
#COPY package.json package-lock.json ./
#RUN npm install
#
#COPY . .
#
#RUN npm run build
#
## Étape 2 : Serveur Nginx
#FROM nginx:1.23
#
## Correction ici : React utilise `build/`, pas `dist/`
#COPY --from=build /app/build /usr/share/nginx/html
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]
#

FROM node:18-alpine

WORKDIR /front-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]