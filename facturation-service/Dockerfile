FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache openssl

WORKDIR /facturation-service

COPY package.json ./
#COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start"]
