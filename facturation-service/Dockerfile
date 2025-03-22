FROM node:18-alpine

WORKDIR /facturation-service

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start"]
