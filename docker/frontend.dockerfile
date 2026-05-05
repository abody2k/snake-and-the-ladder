FROM node:slim as build


WORKDIR /app

COPY ../frontend/snake-and-ladder .

RUN npm i

RUN npm run build


FROM node:slim as prod

WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/package.json .
RUN npm i
CMD sh -c "node index.js"