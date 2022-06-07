# FROM node:16-alpine@sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10

# RUN apk add dumb-init

# ENV NODE_ENV development

# WORKDIR /root

# # NPM install
# COPY --chown=node:node ./package.json ./
# COPY --chown=node:node ./package-lock.json ./
# RUN npm ci

# # Copy configs
# COPY --chown=node:node ./astro.config.mjs ./
# COPY --chown=node:node ./tsconfig.json ./

# EXPOSE 3000

# USER node
# # CMD ["dumb-init", "./node_modules/.bin/astro", "dev", "--", "--host"]