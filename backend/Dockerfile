FROM php:8.1-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql
WORKDIR /var/www/html
COPY . /var/www/html
EXPOSE 80

