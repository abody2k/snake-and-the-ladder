FROM node:slim

WORKDIR /tests/

COPY test .

ENV BASE_URL="http://app:3000"

CMD sh -c "sleep 25 && npm i && npm i playwright@latest && npx playwright test --project=firefox"