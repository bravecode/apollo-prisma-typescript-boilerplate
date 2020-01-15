
require('dotenv').config();
import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server';
import { prisma } from './codegen';
import { resolvers } from './resolvers';

const typeDefs = importSchema('src/schema.graphql');

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => ({
        ...ctx,
        prisma: prisma
    })
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`Server is running at ${url}`);
});