FROM node:22-alpine AS runtime

ENV HOST 0.0.0.0
ENV PORT 9000

WORKDIR /root

COPY ./package.json ./
RUN npm install

COPY ./astro.config.mjs ./
COPY ./components.json ./
COPY ./tsconfig.json ./
COPY ./tailwind.config.mjs ./
RUN npm run dev

EXPOSE 9000

ENTRYPOINT ["node", "./dist/server/entry.mjs"]