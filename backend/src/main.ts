import express, { Request, Response } from 'express';
import cors from 'cors';
import expressRateLimiter from 'express-rate-limit';
import swaggerUIExpress from 'swagger-ui-express';
import history from 'connect-history-api-fallback'; // For react.ts build/production

import config from './config';
import global from './global'; // for global variables
import redis from './helpers/redis'; // for authentication (session management)
import { initWinston, initMorgan } from "./loggers"; // for logging
import swaggerConfig from './config/swagger.json';

global.redis = redis; // Redis is now available globally
const expressApp = express();

// Request Limitations
expressApp.use(cors(config.express.cors));
expressApp.use(expressRateLimiter(config.express.rateLimiter));
expressApp.use(express.json({ limit: config.express.payloadLimit }));

// Logging
initWinston();                // Global Overriding console logging functions with Winston Logger
expressApp.use(initMorgan()); // Network Logging with Morgan Logger

// Swagger works only on Dev-Environment // Make sure you check .env file!
// Written before the middleware code, so it will be executed first (no auth required to open swagger in dev-environment)
if(config.environment == 'development') {
  expressApp.use('/swagger', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerConfig));
}

// Middleware code goes here // on each request // do something
expressApp.use((req: Request, res: Response, next) => {
  // Authentication is not enforced when in development or test environment
  if(config.environment == 'development' || config.environment == 'test') {
    return next(); // continue request
  }

  if(
    (req?.headers?.authorization && global.redis.get(req?.headers?.authorization)) || // if token is valid and exists in redis (not expired)
    req?.url?.includes("/api/login")  // Login api is public
  ){
    return next(); // continue request
  }
  
  if(req?.url?.includes("/api/")){ // Reached backend
    return res.status(401).json({ success: false, msg: "Unauthorized." }); // 401 Unauthorized
  }
  
  // Reached frontend
  return next(); // continue request
});

expressApp.use(require("./routes"));
expressApp.use(history()); // For react.js production // redirect everything to index.html
expressApp.use(express.static(__dirname + '/../public')); // Static pages // public folder // React.js Build // Production

// 404 page
expressApp.use((req, res) => {
  res.status(404).json({ success: false, msg: '404' });
});

// Listening Server
if(config.environment !== 'test'){ // Do not listen while on test environment // because jest/tests are running
  expressApp.listen(config.express.port, () => {
    console.log(`Server is running on port ${config.express.port}`);
  });
}
else {
  console.log('Express Server is not really running because test environment is enabled');
}

console.log(`Environment: ${config.environment}`);

export default expressApp; // Exporting the expressApp for testing purposes (jest)