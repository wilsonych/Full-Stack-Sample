FROM node:12-buster
WORKDIR /app
COPY package*.json ./

RUN npm install

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

CMD ["npm","run","dev"]