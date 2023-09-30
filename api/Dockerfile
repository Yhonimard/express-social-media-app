FROM node:lts-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
EXPOSE 3000 
CMD npm run migrate:prod ; npm run generate ; npm run start