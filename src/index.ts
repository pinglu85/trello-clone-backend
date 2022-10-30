import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import type { DocumentNode } from 'graphql';
import type { IResolvers } from '@graphql-tools/utils';

import { pgPool } from './models';
import { typeDefs, resolvers } from './graphql';
import createWelcomeBoard from './createWelcomeBoard';

dotenv.config();

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: IResolvers
): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    introspection: process.env.NODE_ENV !== 'production',
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  let databaseUrl = process.env.DATABASE_URL_DEV as string;
  let clientUrl = process.env.CLIENT_URL_DEV as string;

  if (process.env.NODE_ENV === 'production') {
    databaseUrl = process.env.DATABASE_URL_PROD as string;
    clientUrl = process.env.CLIENT_URL_PROD as string;
  }

  try {
    await pgPool.open(databaseUrl);
    await server.start();

    app.use(
      '/',
      cors<cors.CorsRequest>({
        origin: [clientUrl],
      }),
      json(),
      expressMiddleware(server)
    );

    const { rows } = await pgPool.query('SELECT COUNT(*) FROM boards');
    if (rows.length && rows[0].count === '0') await createWelcomeBoard();

    const PORT = process.env.PORT || 8000;
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: PORT }, resolve);
    });
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
    pgPool.close();
  }
}

startApolloServer(typeDefs, resolvers);
