FROM node:20 AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN mkdir /app/node_modules
RUN --mount=type=cache,id=node_modules,target=/app/node_modules yarn install --frozen-lockfile
 

FROM deps AS build
COPY . .
RUN --mount=type=cache,id=node_modules,target=/app/node_modules yarn build
 
FROM base
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
ENV NODE_ENV production
CMD ["node", "./dist/index.js"]