FROM node:slim AS build


WORKDIR /frontend

COPY ../frontend/snake-and-ladder .

RUN npm i
RUN npm run build


WORKDIR /backend

COPY ../backend .

RUN npm i && npm i -g typescript
RUN npm i --save-dev @types/jsonwebtoken
RUN mkdir public && cp -r /frontend/build/* public/
RUN tsc






FROM node:slim AS prod

WORKDIR /app

COPY --from=build /backend/dist .
RUN mkdir public
COPY --from=build /frontend/build public/
COPY --from=build /frontend/package.json public/
COPY --from=build /backend/package.json .
RUN cd public && npm i
RUN npm i
CMD sh -c "node index.js"