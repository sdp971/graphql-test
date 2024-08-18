import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//db
import db from './_db.js';

//types
import { typeDefs } from './schema.js';
import { platform } from 'process';

// Resolvers define how to fetch the types defined in your schema.

interface Game {
  id: string;
  title: string;
  platform: string[];
}

interface Review {
  id: string;
  rating: number;
  content: string;
  game_id: string;
  author_id: string;
}

interface Author {
  id: string;
  name: string;
  verified: boolean;
}

interface AddGameInput {
  title: string;
  platform: string[];
}

interface EditGameInput {
  id: string;
  title: string;
  platform: string[];
}

type GameUpdate = Omit<Game, 'id'>;

const resolvers = {
  Query: {
    games(author: Author): Game[] {
      return db.games;
    },
    game(author: Author, args: { id: string }): Game | undefined {
      return db.games.find((game: Game) => game.id === args.id);
    },
    reviews(author: Author): Review[] {
      return db.reviews;
    },
    review(author: Author, args: { id: string }): Review | undefined {
      return db.reviews.find((review: Review) => review.id === args.id);
    },
    authors(author: Author): Author[] {
      return db.authors;
    },
    author(author: Author, args: { id: string }): Author | undefined {
      return db.authors.find((author: Author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent: Game) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent: Author) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent: Review) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent: Review) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(parent: Game, args: { id: string }) {
      db.games = db.games.filter((game: Game) => game.id !== args.id);
      return db.games;
    },
    addGame(parent: Game, args: { input: AddGameInput }): Game {
      const game = {
        ...args.input,
        id: Math.floor(Math.random() * 1000).toString(),
      };

      db.games.push(game);

      return game;
    },
    updateGame(parent: Game, args: { id: string, edits: EditGameInput }): Game | null {
     const updatedGameIndex = db.games.findIndex((game) => game.id === args.id);

     if (updatedGameIndex !== -1) {
       db.games[updatedGameIndex] = {
         ...db.games[updatedGameIndex],
         ...args.edits,
       };
       return db.games[updatedGameIndex];
     }

     return null;
    },
  },
};

//server setup
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  //typeDefs -- definitions of types of data
  typeDefs,
  //resolvers
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
