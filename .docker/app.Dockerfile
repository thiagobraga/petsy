FROM node:20-alpine AS base

WORKDIR /app

FROM base AS dev

RUN npm install -g http-server

COPY . .

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080", "--cors", "-c-1"]

FROM base AS prod

RUN npm install -g http-server

COPY . .

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080", "--cors", "-c-1"]
