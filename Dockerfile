FROM node:18-alpine AS build
RUN npm i npm@latest -g
WORKDIR /build
COPY . .
RUN npm run build

FROM docker.n8n.io/n8nio/n8n:latest
WORKDIR /custom-nodes
COPY --from=build /build .
COPY --from=build /build/.docker/run.sh /run.sh
USER root
RUN npm link
RUN chmod +x /run.sh

USER node
ENTRYPOINT [ "tini", "--", "/run.sh" ]
