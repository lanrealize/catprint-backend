FROM node:16.18

RUN mkdir /app

COPY package.json /app

WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

COPY ./controllers /app/controllers
COPY ./models /app/models
COPY ./routes /app/routes
COPY ./utils /app/utils
COPY ./services /app/services
COPY .env /app
COPY config.json /app
COPY server.js /app

RUN mkdir /app/images

EXPOSE 3000

CMD ["npm", "start"]