# syntax=docker/dockerfile:1


FROM node:slim as build
WORKDIR /backend-build
COPY backend .
RUN pwd && ls && npm i && npm i -g typescript && tsc



FROM node:slim as production
WORKDIR /backend
COPY backend/package.json .
COPY --from=build /backend-build/dist .

RUN pwd && ls && npm i
CMD [ "node", "index.js" ]
