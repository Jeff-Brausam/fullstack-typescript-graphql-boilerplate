import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { Server } from "http";
import * as express from "express";

import { GRAPHQL_SCHEMA_PATH } from "./constants";
import { ApplicationResolverContext } from "./resolvers";
import Db from "./db";
import resolvers from "./resolvers";

const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const server = new ApolloServer({
    schema: addResolversToSchema({ schema: SCHEMA, resolvers }),
    context: (): ApplicationResolverContext => ({ db }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  return server;
}