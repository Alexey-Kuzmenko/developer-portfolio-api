FROM node:18
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 3000
CMD [ "node", "./dist/main.js" ]