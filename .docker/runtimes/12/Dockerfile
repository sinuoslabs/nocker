FROM node:12

LABEL maintainer="Sinuos labs"

ARG APP_PORT=3000

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g npm \
    && npm install -g typeorm

EXPOSE $APP_PORT

CMD ["npm", "run", "start:dev"]