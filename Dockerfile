FROM node:16

WORKDIR /project

COPY . .

RUN npm install

CMD [ "node", "./getAssets.js" ]