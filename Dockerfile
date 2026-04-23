# syntax=docker/dockerfile:1


FROM node:slim as build
WORKDIR /backend-build
COPY backend/* .
RUN npm i -g typescript && npm i && tsc



FROM node:slim as production
WORKDIR /backend
COPY --from=build /backend-build/dist/* /backend/
RUN npm i
CMD [ "node", "index.js" ]
