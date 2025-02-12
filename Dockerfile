FROM node:20 AS base

RUN npm install -g pnpm@9.15.4

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./ 

RUN pnpm install


FROM base AS build

WORKDIR /app

COPY . . 

COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm build

FROM base AS deploy

WORKDIR /app

COPY --from=dependencies /app/package.json ./ 
COPY --from=dependencies /app/pnpm-lock.yaml ./
COPY --from=build /app/.next/ ./.next/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public


EXPOSE 3000

CMD ["pnpm", "start"]
