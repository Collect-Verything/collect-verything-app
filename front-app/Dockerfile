FROM node:16-alpine

WORKDIR /front-app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
