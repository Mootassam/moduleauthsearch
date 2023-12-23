FROM node:14 as node
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . .
# RUN npm run build:production

FROM nginx:1.13.12-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder  /app/build /usr/share/nginx/html
 


