# Utilise une image Node.js comme base
FROM node:18-alpine

# Installer les outils nécessaires, comme nc
RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache openssl

# Crée et utilise le répertoire de travail /auth-service
WORKDIR /facturation-service

# Copie les fichiers package.json et package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Installe les dépendances de production
RUN npm install

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Ajoute les permissions d'exécution au script start.sh
RUN chmod +x ./start.sh

# Expose le port sur lequel l'application écoute
EXPOSE 3003

# Utiliser le script pour attendre MySQL avant de démarrer Prisma
CMD ["sh", "./start.sh"]
