FROM node:9.4.0

RUN apt-get update
RUN apt-get install -y apt-utils build-essential
RUN npm install npm@6.4.0 --global
RUN npm install nodemon -g

ENV WEBSERVER=/app
RUN mkdir $WEBSERVER

WORKDIR $WEBSERVER
EXPOSE 4050
CMD ["nodemon", "main.js"]
