import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import helmet from 'helmet';
import { GraphQLRequestListener } from '@apollo/server';
import { BaseContext } from '@apollo/server';
import { ApolloServerPlugin } from '@apollo/server';

import typeDefs from './graphql';
import allResolvers from './graphql/resolvers';
import { gqlLogger, httpLogger, runtimeLogger } from './utils/loggers';
import rateLimitMiddleware from './middleware/ratelimiter';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth';
import config from './config';

const startServer = async () => {
  const app = express();
  app.use(
    cors<cors.CorsRequest>(),
    pinoHttp({ logger: httpLogger }),
    ...(process.env.NODE_ENV !== 'development' ? [helmet(), rateLimitMiddleware] : []),
    express.json(),
  );

  const httpServer = http.createServer(app);
  const plugin: ApolloServerPlugin = {
    async requestDidStart(ctx) {
      const logger = gqlLogger.child({ requestId: ctx });
      logger.info({
        operationName: ctx.request.operationName,
        query: ctx.request.query,
        variables: ctx.request.variables,
      });

      return {
        didEncounterErrors({ logger, errors }) {
          errors.forEach((error) => logger.error(error));
        },
      } as GraphQLRequestListener<BaseContext>;
    },
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    introspection: true,
    formatError: (error) => {
      gqlLogger.error(error);
      return error;
    },
    includeStacktraceInErrorResponses: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), plugin],
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  if (config.nodeEnvironment === 'development') {
    app.use('/gen/graphql', expressMiddleware(server)); // just for codegen on client of frontend
  }
  app.use('/auth', authRouter);

  app.get('/health', (_, res) => {
    res.status(200).send('Okay!');
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  runtimeLogger.info(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
