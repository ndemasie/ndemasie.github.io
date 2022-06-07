FROM node:16-alpine

ENV NODE_ENV development

WORKDIR /root

# NPM install
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copy configs
COPY ./astro.config.mjs ./
COPY ./tsconfig.json ./
COPY ./postcss.config.js ./

EXPOSE 3000

CMD npm run astro:dev -- --host