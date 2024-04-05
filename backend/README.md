# Node.js Express Backend App

This is a Node.js and Express backend application. It provides RESTful APIs for performing CRUD operations on users, questions, and answers.

## Table of Contents

- [Starting the Application](#starting-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Docker](#docker)

## Starting the Application

You can start the backend in two ways:

1. **Using `nodemon`**:
   Run the following command to start the backend using `nodemon`:
   Command = npx nodemon src/app.ts
This will start the server with hot-reloading enabled for development.

2. **Using Docker**:
Use Docker Compose to start the application:
This will start the server in a Docker container.

## API Endpoints

The API provides the following endpoints:

- `/users`: CRUD operations for users.
- `/questions`: CRUD operations for questions.
- `/answers`: CRUD operations for answers.

Detailed documentation for each endpoint can be found in the respective route files.

## Project Structure

The project structure is as follows:

nodejs-express-backend/
├── src/
│ ├── app.ts
│ ├── controllers/
│ ├── models/
│ ├── routes/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md

## Docker

The Dockerfile and docker-compose.yml files are provided to allow easy containerization of the application. Make sure Docker is installed on your machine to use this feature.

## Running the Frontend

To see the views in the browser, you need to run the frontend. Follow these steps:

1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the frontend server:

npm start
