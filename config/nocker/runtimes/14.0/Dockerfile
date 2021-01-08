FROM ubuntu:20.04

LABEL maintainer="The martian geeks"

ARG WWWGROUP

WORKDIR /var/app

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y curl zip unzip git \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN groupadd --force -g 1337 $WWWGROUP nocker
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP nocker -u 1337 nocker

COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

EXPOSE 3000

ENTRYPOINT ["start-container"]
