FROM node:slim

WORKDIR /tests/

COPY test .

ENV BASE_URL="http://app:3000"

CMD sh -c "npm i && npm i playwright@latest && npx playwright test api.spec.ts --project=firefox"