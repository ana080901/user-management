import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    usersByName(name: String!): [User]
    usersByEmail(email: String!): [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: ID!): User
  }
`;
