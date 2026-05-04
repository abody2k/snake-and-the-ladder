FROM node:slim as build


WORKDIR /app

COPY ../frontend/snake-and-ladder .

RUN npm i

RUN npm run build




