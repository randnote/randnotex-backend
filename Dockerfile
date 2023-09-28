FROM node:17-alpine

RUN yarn global add nodemon

WORKDIR /backend

COPY package.json .

RUN yarn install 

COPY . .

EXPOSE 8024

CMD ["yarn", "run", "dev"]