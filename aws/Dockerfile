FROM docker/compose:1.25.0-rc2-alpine
ARG APP_DOMAIN=52.59.210.34
ARG GIT_TAG=dev
ARG GIT_URL=https://github.com/n8tz/www.mamasound.fr


RUN apk --no-cache update \
        && apk add --no-cache \
        python \
        make \
        g++ \
        automake \
        autoconf \
        git \
        nano \
        htop \
        certbot

ENV PATH=node_modules/.bin:$PATH

RUN git clone $GIT_URL /home/app
WORKDIR /home/app
RUN git checkout $GIT_TAG

EXPOSE 80/tcp
EXPOSE 80/udp

CMD APP_RUN_BEFORE="npm i" APP_MODE=prod APP_DOMAIN=${APP_DOMAIN} docker-compose up --build