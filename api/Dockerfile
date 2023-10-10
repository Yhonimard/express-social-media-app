FROM node:lts-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
EXPOSE 40081
CMD ["npm", "run", "start:container"]