FROM node:17-alpine

WORKDIR /backend

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8024

CMD ["yarn", "start"]