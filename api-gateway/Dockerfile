FROM node:18-alpine

WORKDIR /api-gateway

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 2999

CMD ["npm", "run", "start:debug"]
