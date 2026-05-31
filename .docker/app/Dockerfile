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
EXPOSE 8080
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]
