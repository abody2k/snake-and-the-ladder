FROM node:slim

WORKDIR /app
COPY frontend/snake-and-adder .
CMD sh -c "npm i && npm run dev"