FROM node:slim

WORKDIR /app
CMD sh -c "npm i && npm run build && npm run preview"