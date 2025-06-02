# Étape 1 : builder l'application Vite React
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 : servir l'app construite avec nginx
FROM nginx:alpine

# Copier le build Vite (dist) dans nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
