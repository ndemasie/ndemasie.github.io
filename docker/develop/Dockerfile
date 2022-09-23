FROM node:16-alpine

ENV ENVIRONMENT_MODE development

WORKDIR /root

# NPM install
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copy configs
COPY ./astro.config.mjs ./
COPY ./tsconfig.json ./
COPY ./postcss.config.js ./
# COPY ./.prettierrc.json ./
# COPY ./.eslintrc.json ./
# COPY ./.stylelintrc.json ./

EXPOSE 3000

CMD npm run astro:dev -- --host