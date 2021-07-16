# first stage: build dependencies
FROM node:lts-alpine AS build

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
# RUN npm ci
RUN npm ci

# second stage: move built deps and code to final container
FROM node:lts-alpine

WORKDIR /usr/src/app
COPY --from=build node_modules node_modules

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]