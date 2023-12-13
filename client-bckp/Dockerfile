FROM node:lts-alpine as build
WORKDIR /app
ARG API_URL
ARG API_BASE_URL
ARG ENV_FROM_WHAT
COPY package*.json .
RUN npm install
COPY . .
ENV VITE_API_URL=${API_URL}
ENV VITE_API_BASE_URL=${API_BASE_URL}
ENV VITE_ENV_FROM_WHAT=${ENV_FROM_WHAT}
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]