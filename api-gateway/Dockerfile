# Utilise une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /api-gateway

# Copier uniquement les fichiers nécessaires pour optimiser le cache
COPY package.json package-lock.json ./

# Installer uniquement les dépendances de production
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port utilisé par l'API Gateway
EXPOSE 2999

# Lancer l'application en production
CMD ["npm", "run", "start"]
