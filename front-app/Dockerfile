FROM node:16-alpine

WORKDIR /front-app

COPY /front-app/package.json /front-app/package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["cd","front-app"]
CMD ["npm", "start"]
