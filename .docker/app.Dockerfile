FROM node:20-alpine AS base

WORKDIR /app

FROM base AS dev
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080", "--cors", "-c-1"]
