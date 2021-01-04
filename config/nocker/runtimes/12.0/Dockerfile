FROM node:12

LABEL maintainer="DJAMO"

ARG WWWGROUP

WORKDIR /var/app

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN groupadd --force -g $WWWGROUP nocker
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 nocker

COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

EXPOSE 8000

ENTRYPOINT ["start-container"]
