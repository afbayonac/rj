FROM node:6.9.2
MAINTAINER afbayonac <afbayonac@gmail.com>
RUN mkdir -p /app
WORKDIR /app
EXPOSE 3000
ARG env
ENV NODE_ENV $env
