# https://hub.docker.com/_/node
FROM node:18-alpine as build

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . ./

# Env variables
ENV PORT=80
ENV TZ=UTC

# Build the application
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]