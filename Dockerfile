FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

RUN pnpm ci 
EXPOSE 3333

CMD ["node", "src/server.ts"]