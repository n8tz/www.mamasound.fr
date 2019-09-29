FROM node:8.12.0-alpine

ARG MONGO_URI=mongodb://mongodb:27017
ARG REDIS_URI=redis://redis:6379
ARG APP_DOMAIN=app.localhost

RUN mkdir /home/app

RUN apk --no-cache update \
        && apk add --no-cache \
        python \
        make \
        g++ \
        automake \
        autoconf \
        zlib-dev \
        mongodb-tools \
        bash \
        rsync \
        git \
        nano \
        htop \
        certbot

ENV PATH=node_modules/.bin:$PATH
ENV APP_DOMAIN=${APP_DOMAIN}
ENV MONGO_URI=${MONGO_URI}
ENV REDIS_URI=${REDIS_URI}

CMD bash