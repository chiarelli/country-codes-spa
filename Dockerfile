FROM node:10.15.3-jessie

RUN npm install nodemon@1.18.11 -g && \
 useradd --user-group --create-home --shell /bin/false app && \
 usermod -a -G app app

ENV WEBSERVER=/home/app

WORKDIR $WEBSERVER
EXPOSE 8080
CMD ["nodemon", "main.js"]