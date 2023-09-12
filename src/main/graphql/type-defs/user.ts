export default `#graphql
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
  }

  type LoginResult {
    id: Int
    firstName: String
    lastName: String
    email: String
    token: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String
    password: String!
  }

  type Query {
    login(email: String!, password: String!): LoginResult

    user: User @auth
  }

  type Mutation {
    createUser(user: UserInput!): User
  }
`
