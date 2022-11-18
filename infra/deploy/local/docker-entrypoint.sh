#!/bin/sh
set -e
set -x

sed -i "s|__REACT_APP_API__|${REACT_APP_API}|g" /var/www/html/static/js/*.js
sed -i "s|__REACT_APP_ONE_LOGIN_AUTHORITY__|${REACT_APP_ONE_LOGIN_AUTHORITY}|g" /var/www/html/static/js/*.js
sed -i "s|__REACT_APP_ONE_LOGIN_CLIENT_ID__|${REACT_APP_ONE_LOGIN_CLIENT_ID}|g" /var/www/html/static/js/*.js
sed -i "s|__REACT_APP_ONE_LOGIN_REDIRECT_URI__|${REACT_APP_ONE_LOGIN_REDIRECT_URI}|g" /var/www/html/static/js/*.js

nginx -g 'daemon off;'

exec "$@"
