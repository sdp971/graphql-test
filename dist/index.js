import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//db
import db from './_db.js';
//types
import { typeDefs } from './schema.js';
const resolvers = {
    Query: {
        games(author) {
            return db.games;
        },
        game(author, args) {
            return db.games.find((game) => game.id === args.id);
        },
        reviews(author) {
            return db.reviews;
        },
        review(author, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors(author) {
            return db.authors;
        },
        author(author, args) {
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id);
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
