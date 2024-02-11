FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . .
RUN npm run build:production
# Stage 2: Serve the application using Nginx
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
