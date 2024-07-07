# Limbic Fullstack Code Challenge

# Backend

Backend is developed with (TypeScript, NodeJS, ExpressJS, Jest, PostgreSQL, Redis) Stack

It is a production quality build (but lite version), full version can could have Multitenancy & RBAC, Stateless JWT Tokens, custom ratelimiter (more control to failure accesses), etc..

## Installation
Use node package manager npm.

```bash
npm install
```

## Start
### Locally
Make sure you install PostgreSQL locally and create database `limbic_therapist` manually, check .env file for DB config.

Then to start the backend
```
npm run dev
```
aliases: `npm run start` and `npm run serve`

### Docker
If on windows, run this file:
```
start.bat
```
or on Linux/OSX
```
chmod +x start.sh # do this once
./start.sh
```
The above commands starts the whole docker stuff (Node, PostgreSQL, Redis) and deploys everything automatically, once it is ready and done

You can navigate to http://localhost:3000

default username and password: (admin, admin)

## Build

```bash
npm run build
```
Then check dist folder for node.js codes

or build and run it as node.js at the same time

Note: Frontend is already built and deployed inside /public folder

```
npm run node
```

## Auth
- Used hardcoded credentials (username & password) password hashed with sha512 wrapped with salt and pepper. 

- When a successful authentication happens, the backend provides access token (uuidv4) to the frontend, this token is stored inside redis(if available) or inside storageObject(as a redis alternative mechanism).

- This token is required to be provided in req.headers.authorization in every request to the api/controller.

- This token will be expired (current /src/config/index.ts) after 1 hour, in redis as a default feature but with storageObject a custom setTimeout class is written inside /src/helpers/services.ts to help in expiring it.

- The frontend stores this token inside localStorage, and also stores its expiration date (1 hour) should be synced with backend, expiring the token logic is implemented in frontend.

- You can modify and run /src/helpers/generatePwdHash.ts using
```
cd /src/helpers/
npx ts-node generatePwdHash.ts
```
To generate a password hash then you can copy it and add it to the hardcoded config file
```
/src/config/index.ts
```

## Security Hardenings (Lite)
- Cors is enabled with wildcard: `*`, but can be configured, when needed
- Express RateLimiter: window 1 minute, 200 requests per IP
- Express Json Packet Size Limiter: 100kb
- Used database table prefixes: /knexfile.ts
- Schema Validator: Joi library, used it to validate inputs from users and to prevent errors and mistakes.

Most above subjects can be configured inside: /src/config/index.ts

## Testing
### Jest
```
npm run jest
```
aliases: `npm run test` and `npm run tests`

it will run and simulate requests to all API controllers automatically

### Swagger
To enable swagger, you must set, in .env (if locally) or in docker-compose.yml (if docker)
```
NODE_ENV="development" 
```

Then you can run the backend, then navigate to http://localhost:3000/swagger

Note: the swagger configs are auto generated when you start the backend using: npm run start

You can generate it manually using: `npm run swagger-autogen` the output will be inside: /src/config/swagger.json

## Logging

- Global Overriding console logging functions with Winston Logger
- Network Logging with Morgan Logger

You can check the logs inside /src/logs/
- If file ends with -m.log (it is morgan log file)
- If file ends with -w.log (it is winston log file)


## Data Migration and Seeding
When you first run the backend, after a successful connection to Database, if this is first time it runs, the backend will automatically runs knex migration to create the database tables then it will seed them automatically with random data using knex seeder and faker.js

Check /src/migrations and /src/seeds

You can run the following commands as pleased using `npm run $command`:
each command shows what it does next to it
```
{
    "init-db": "knex migrate:latest && knex seed:run",
    "migrate-db": "knex migrate:latest",
    "generate-seeds": "knex seed:run",
    "rollback-db": "knex migrate:rollback",
    "migration-version": "knex migrate:currentVersion"
}
```


## Environments
using .env file, 

```
# This ENV file will be overriden inside the docker container using docker-compose.yml, 
# but it is useful for local development and testing

# development: "will enable /swagger and disable enforcing authentication"
# test: "will be overrided while running tests using jest
# production: "For real use"
# Note: when this app running in test environment, express app will not be listening on a port,
# it will be simulated, also redis won't be used, it will be simulated, 
# authentication enforcing will be disabled for the simulation.
NODE_ENV="production" 

# HTTP port for the server
HTTP_PORT="3000"

# DBMS
DATABASE_URL="postgres://postgres:password@localhost:5432/limbic_therapist" 

# Redis For Authentication Session Storage
REDIS_URL="redis://localhost:6379" 
```

# Frontend

## Installation
Use node package manager npm.

```bash
npm install
```

## Start
Then to start the frontend, check .env file before you start, to point frontend requests to backend APIs
```
npm run dev
```
aliases: `npm run start` and `npm run serve`

You can navigate to http://localhost:3000 or http://localhost:3001 (if both backend and frontend running locally)

default username and password: (admin, admin)

## Build

```bash
npm run build
```
Then check build folder for javascript build files

or build and deploy to backend with single command

```
npm run build-to-backend
```

## Security Hardenings (Lite)
- Schema Validator: Joi library, used it to validate inputs from users and to prevent errors and mistakes (before sending a request to backend).
- Login Forms (Authentication)

## Testing
### Jest
```
npm run jest
```
aliases: `npm run test` and `npm run tests`

it will run and simulate rendering all components automatically

## Screenshots
![screenshot](screenshots/01.jpg)
![screenshot](screenshots/02.jpg)
![screenshot](screenshots/03.jpg)
![screenshot](screenshots/04.jpg)
![screenshot](screenshots/05.jpg)
![screenshot](screenshots/06.jpg)
![screenshot](screenshots/07.jpg)
![screenshot](screenshots/08.jpg)
![screenshot](screenshots/09.jpg)
![screenshot](screenshots/10.jpg)
![screenshot](screenshots/11.jpg)
