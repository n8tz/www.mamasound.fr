FROM node:8.12.0-alpine
ARG APP_DOMAIN=52.59.210.34
ARG GIT_TAG=release
ARG GIT_BRANCH=dev
ARG GIT_URL=https://github.com/n8tz/www.mamasound.fr

RUN apk --no-cache update \
        && apk add --no-cache \
        python \
        python-dev \
        make \
        g++ \
        automake \
        autoconf \
        zlib-dev \
        libffi-dev \
        openssl-dev \
        mongodb-tools \
        bash \
        mongodb-tools \
        rsync \
        py-pip \
        git \
        certbot \
        nano \
        htop


ENV PATH=node_modules/.bin:$PATH
ENV APP_DOMAIN=${APP_DOMAIN}

RUN git clone $GIT_URL /home/app
WORKDIR /home/app
RUN git fetch --all --tags --prune
RUN git checkout tags/$GIT_TAG -b $GIT_BRANCH

RUN npm i&&npm run build

#EXPOSE 80/tcp
#EXPOSE 80/udp

#CMD cd aws&&APP_RUN_BEFORE="npm i" APP_MODE=prod APP_DOMAIN=${APP_DOMAIN} docker-compose up