FROM node:13.8.0-alpine3.10
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g rtail redis 
RUN npm install --production && mv node_modules ../
COPY . .
RUN cp Los_Angeles /etc/localtime && echo "America/Los_Angeles" > /etc/timezone
RUN date
EXPOSE 8000
CMD npm start
