FROM node:18.17.0-alpine as build
WORKDIR /app
ARG API_URL
ARG API_BASE_URL
COPY package* .
RUN npm install
COPY . .
ENV VITE_API_URL=${API_URL}
ENV VITE_API_BASE_URL=${API_BASE_URL}
RUN npm i @rollup/rollup-linux-x64-gnu
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]