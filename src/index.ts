import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import dotenv from 'dotenv';
import type { DocumentNode } from 'graphql';
import type { IResolvers } from '@graphql-tools/utils';

import pgPool from './models/pgPool';
import snakeCaseFieldResolver from './utils/snakeCaseFieldResolver';
import { typeDefs, resolvers } from './graphql';
import createWelcomeBoard from './createWelcomeBoard';

dotenv.config();

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: IResolvers
): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  let databaseUrl;
  const apolloServerPlugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ];

  if (process.env.NODE_ENV === 'development') {
    databaseUrl = process.env.DATABASE_URL_DEV as string;
    apolloServerPlugins.push(
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    );
  } else {
    databaseUrl = process.env.DATABASE_URL_CLOUD as string;
    apolloServerPlugins.push(
      ApolloServerPluginLandingPageProductionDefault({ embed: false })
    );
  }

  try {
    await pgPool.createConnection(databaseUrl);

    const server = new ApolloServer({
      introspection: process.env.NODE_ENV !== 'production',
      fieldResolver: snakeCaseFieldResolver,
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: apolloServerPlugins,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/' });

    const { rows } = await pgPool.query('SELECT COUNT(*) FROM boards');
    if (rows.length && rows[0].count === '0') await createWelcomeBoard();

    const PORT = process.env.PORT || 8000;
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
    );
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  } catch (error) {
    console.error(error);
    pgPool.close();
  }
}

startApolloServer(typeDefs, resolvers);
