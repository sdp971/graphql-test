export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
 
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 

   type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }
  type Query {
    games: [Game]
    reviews: [Review]
    authors: [Author]
  }
 
`;
//int, float, string, boolean, ID 
