# Project Description

This project is a backend application that provides endpoints for managing users, questions, and answers. It is built using Express.js and follows a RESTful API design.

## User Routes

- `GET /`: Get all users (requires authentication and authorization)
- `POST /`: Create a new user
- `POST /mock_login`: Perform a mock login
- `GET /:uuid`: Get a user by UUID (requires authentication and authorization)

## Question Routes

- `POST /`: Create a new question (requires authentication)
- `GET /:uuid`: Get a question by UUID (requires authentication)
- `PUT /:uuid`: Update a question by UUID (requires authentication)
- `DELETE /:uuid`: Delete a question by UUID (requires authentication)
- `GET /`: Get all questions (requires authentication)

## Answer Routes

- `POST /`: Create a new answer (requires authentication)
- `GET /:uuid`: Get an answer by UUID (requires authentication)
- `PUT /:uuid`: Update an answer by UUID (requires authentication)
- `DELETE /:uuid`: Delete an answer by UUID (requires authentication)
- `GET /`: Get all answers (requires authentication)
