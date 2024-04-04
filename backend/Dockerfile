FROM node:20-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Copy the rest of the application's code into the container
COPY . .

# Building app
RUN npm run build

# Expose the port app runs on
EXPOSE 3000

# Set the command to run the built application
CMD ["npm", "run", "start:dev"]
