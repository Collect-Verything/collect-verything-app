FROM node:20-alpine

WORKDIR /auth-service

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

