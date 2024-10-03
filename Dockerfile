FROM node:18-slim

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]