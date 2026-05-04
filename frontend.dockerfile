FROM node:slim
WORKDIR /app
COPY frontend/snake-and-ladder .
CMD sh -c "npm i && npm run build && npm run preview"