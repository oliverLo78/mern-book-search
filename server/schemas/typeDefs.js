const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type me {
    _id: ID
    name: String
  }

  type Mutation {
    login(name: String!, email: , password: String!): ne
    addUser(username: String!, email: , password: String!): me
    saveBook(description: String!, title: String!, bookId: ID!, image: , link: ): me
    removeBook(bookId: ID!): me
  }
`;

module.exports = typeDefs;
