FROM node:13.8.0-alpine3.10
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
RUN cp Los_Angeles /etc/localtime
RUN echo "America/Los_Angeles" > /etc/timezone
RUN date
EXPOSE 500
CMD npm start
