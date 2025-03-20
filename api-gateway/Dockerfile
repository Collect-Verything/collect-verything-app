# Utilise une image Node.js comme base
FROM node:18-alpine

# Installer les outils nécessaires, comme nc
RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache openssl

# Crée et utilise le répertoire de travail /auth-service
WORKDIR /api-gateway

# Copie les fichiers package.json et package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Installe les dépendances de production
RUN npm install

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Expose le port utilisé par l'API Gateway
EXPOSE 2999

# Commande de démarrage de l'application
CMD ["npm", "run", "start:dev"]
