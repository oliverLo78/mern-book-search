const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type me {
    _id: ID
    name: String
  }

  type Mutation {
    login(name: String!, email: String!, password: String!): ne
    addUser(username: String!, email: String!, password: String!): me
    saveBook(description: String!, title: String!, bookId: ID!, image: , links: [Link]!): me
    removeBook(bookId: ID!): me
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    type SavedBook: [

    ],
  }
`;

module.exports = typeDefs;
