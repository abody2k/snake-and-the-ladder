FROM node:slim

WORKDIR /tests/

COPY test .

ENV BASE_URL=app

CMD sh -c "npm i && npm i playwright@latest && npx playwright test"