import pino from 'pino';

export const runtimeLogger = pino({
  level: process.env.PINO_LOG_LEVEL || 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
});

export const httpLogger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  name: 'http-logger',
});

export const gqlLogger = pino({
  name: 'gql-logger',
  depthLimit: 1000,
});
