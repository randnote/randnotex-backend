FROM node:17-alpine

RUN yarn global add nodemon

WORKDIR /backend

# COPY package.json .
COPY . .
RUN yarn install 

EXPOSE 8024

CMD ["yarn", "run", "dev"]