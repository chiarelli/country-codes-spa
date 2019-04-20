FROM node:10.15.3-jessie

RUN npm install nodemon@1.18.11 -g && \
 useradd --user-group --create-home --shell /bin/false app && \
 usermod -a -G app app

ENV WEBSERVER=/home/app
ADD webserver/ $WEBSERVER/

RUN chown -R app:node $WEBSERVER && \
 find $WEBSERVER/. -type d -exec chmod 775 {} \; && \
 find $WEBSERVER/. -type f -exec chmod 664 {} \;

USER app
RUN cd $WEBSERVER && npm install $WEBSERVER

WORKDIR $WEBSERVER
EXPOSE 8080
CMD ["nodemon", "main.js"]
