const { gql } = require('apollo-server')

module.exports = gql`

type Query{
    user(id: ID): [User!]
    team(id: ID): [Team!]
}

type Mutation{
    createUser( data: CreateUserInput! ):         User!
    deleteUser( id:ID! ):                         User!
    updateUser( id:ID!, data: UpdateUserInput! ): User!

    createTeam( data : CreateTeamInput!):   Team!
    deleteTeam( id : ID! ):                 Team!
    updateTeam( data : UpdateTeamInput!):   Team!
}

type User{
    _id: ID!
    userName: String!
    userEmail: String!
    pic: String
    gender: String
    bio: String
    teams: [Team!]
    createdAt: String
}

type Team{
    _id: ID!
    teamName: String!
    description: String
    visibility: Boolean!
    createdBy: User
    createdAt: String
}

input CreateUserInput{
    userName: String!
    userEmail: String!
    pic: String
    gender: String
    bio: String
    team: ID
}

input UpdateUserInput{
    userName: String
    userEmail: String
    pic: String
    gender: String
    bio: String
    team: ID
}

input CreateTeamInput{
    teamName: String!
    description: String
    visibility: Boolean!
    createdBy: ID!
}

input UpdateTeamInput{
    teamName: String
    description: String
    visibility: Boolean
    createdBy: ID
}

`

