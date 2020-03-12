FROM node:13.8.0-alpine3.10
ENV RTAIL_SERVER_PORT_WEB=8181
ENV RTAIL_SERVER_PORT_UDP=9191
ENV RTAIL_LISTEN_IP=0.0.0.0
EXPOSE ${RTAIL_SERVER_PORT_WEB} ${RTAIL_SERVER_PORT_UDP}
COPY ./Los_Angeles /etc/localtime
RUN echo "America/Los_Angeles" > /etc/timezone && date && npm install -g rtail && apk add --no-cache netcat-openbsd
CMD rtail-server --wh ${RTAIL_LISTEN_IP} --wp ${RTAIL_SERVER_PORT_WEB} --uh ${RTAIL_LISTEN_IP} --up ${RTAIL_SERVER_PORT_UDP}
