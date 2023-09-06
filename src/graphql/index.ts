import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from "./resolvers";
import { readFileSync } from "fs";
import { Kysely } from "kysely";
import { DB } from "kysely-codegen";
import { startDB } from "../db";

const path = require('path');

const typeDefs = readFileSync('./src/graphql/types/types.graphql', { encoding: 'utf-8' });
export interface Context {
  db: Kysely<DB>,
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function start() {
  const db = startDB();

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: () => Promise.resolve({
      db,
    }),
  });

  console.log(`Server started at ${url}`);
}

start();