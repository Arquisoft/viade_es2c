FROM node:12-alpine as builder

WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build
COPY . /app

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html/viade_es2c
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
