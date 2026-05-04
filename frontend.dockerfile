FROM node:slim
WORKDIR /app
COPY frontend/snake-and-ladder .
CMD sh -c "npm i && npm run dev --host --port 3002"