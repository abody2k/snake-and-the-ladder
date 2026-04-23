FROM node:slim
WORKDIR /backend
CMD sh -c "npm install ts-node --verbose && npx nodemon --legacy-watch --watch src --ext ts --exec ts-node src/index.ts"