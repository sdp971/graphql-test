import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
//db
import db from './_db.js'

//types
import { typeDefs } from './schema.js'

// Resolvers define how to fetch the types defined in your schema.

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    reviews() {
      return db.reviews
    },
    authors() {
      return db.authors
    }
 }
};


//server setup
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  //typeDefs -- definitions of types of data
  typeDefs,
  //resolvers
  resolvers
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
