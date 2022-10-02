const { gql } = require('apollo-server')

module.exports = gql`

type Query{
    user(id: ID): [User!]!
}

type Mutation{
    createUser( data: CreateUserInput! ):         User!
    deleteUser( id:ID! ):                         User!
    updateUser( id:ID!, data: UpdateUserInput! ): User!
}

type User{
    _id: ID!
    userName: String!
    userEmail: String!
    pic: String
    gender: String
    # teams: [String!]
    bio: String
    createdAt: String
}

input CreateUserInput{
    userName: String!
    userEmail: String!
    pic: String
    gender: String
    teams: [String!]
    bio: String
}

input UpdateUserInput{
    userName: String
    userEmail: String
    pic: String
    gender: String
    teams: [String!]
    bio: String
}

`

