export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
 
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 

   type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
   
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
    game_id: ID
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id : ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
 
`;
   ;

//int, float, string, boolean, ID 