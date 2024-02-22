FROM node:18.17.0-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]