#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:16.17.0
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
CMD ["yarn", "start:dev"]
