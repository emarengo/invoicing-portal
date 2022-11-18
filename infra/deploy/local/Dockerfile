# React app
FROM node:16 AS builder

ENV REACT_APP_API=__REACT_APP_API__
ENV REACT_APP_ONE_LOGIN_AUTHORITY=__REACT_APP_ONE_LOGIN_AUTHORITY__
ENV REACT_APP_ONE_LOGIN_CLIENT_ID=__REACT_APP_ONE_LOGIN_CLIENT_ID__
ENV REACT_APP_ONE_LOGIN_REDIRECT_URI=__REACT_APP_ONE_LOGIN_REDIRECT_URI__

WORKDIR /app
ADD . /app

RUN rm -rf yarn.lock && rm -rf node_modules

RUN yarn install && yarn build

# Nginx server
FROM nginx:1.14.2-alpine

RUN rm -rf /var/www/html/*

COPY --from=builder /app/build/. /var/www/html/
COPY --from=builder /app/build/index.html /var/www/html/index.html
COPY --from=builder /app/infra/build/nginx/. /etc/nginx/
COPY --from=builder /app/infra/deploy/local/docker-entrypoint.sh /tmp/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["sh", "/tmp/docker-entrypoint.sh"]
