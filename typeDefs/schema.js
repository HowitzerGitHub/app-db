const { gql } = require('apollo-server')

module.exports = gql`

type Query{
    user(id: ID):           [User!]
    loginUser(userEmail: String!, password: String!): User!
    team(id: ID):           [Team!]
    curriculum (id:ID):     [Curriculum!]
    subject(id:ID):         [Subject!]
    chapter(id:ID):         [Chapter!]
}

type Mutation{
    createUser( data: CreateUserInput! ):         User!
    updateUser( id:ID!, data: UpdateUserInput! ): User!
    deleteUser( id:ID! ):                         User!

    createTeam( data : CreateTeamInput!):           Team!
    updateTeam( id:ID!, data: UpdateTeamInput!):    Team!
    deleteTeam( id : ID! ):                         Team!

    createCurriculum ( data : CreateCurriculumInput!):          Curriculum!
    updateCurriculum ( id:ID!, data : UpdateCurriculumInput!):  Curriculum!
    deleteCurriculum ( id : ID!):                               Curriculum!

    createSubject ( data : CreateSubjectInput!):          Subject!
    updateSubject ( id:ID!, data : UpdateSubjectInput!):  Subject!
    deleteSubject ( id : ID!):                            Subject!

    createChapter ( data : CreateChapterInput!):          Chapter!
    updateChapter ( id:ID!, data : UpdateChapterInput!):  Chapter!
    deleteChapter ( id : ID!):                            Chapter!
}

type User{
    _id: ID!
    userName: String!
    userEmail: String!
    pic: String
    gender: String
    password: String
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
    curriculum: [Curriculum]
    members: [User]
}

type Curriculum{
    _id: ID
    curriculumName: String
    team: Team
    description: String
    createdBy: User
    createdAt: String
    subject: [Subject]
}

type Subject{
    _id:ID
    subjectName: String
    curriculum: Curriculum #id of curriculum
    chapter: [Chapter]
    refrences: [String]
    description: String,
    createdAt: String
}

type Chapter{
    _id:ID
    chapterName: String
    subject: Subject
    refrences: [String]
    description: String
    duration: String
    createdAt: String
}


input CreateUserInput{
    userName: String!
    userEmail: String!
    password : String!
    pic: String
    gender: String
    bio: String
    # team: ID
}

input UpdateUserInput{
    userName: String
    userEmail: String
    password: String
    pic: String
    gender: String
    bio: String
    team: ID
    addTeam: Boolean #true if team is to be added false if it is to be removed
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

input CreateCurriculumInput{
    curriculumName: String!
    team: ID!
    description: String
    createdBy: ID!
}

input UpdateCurriculumInput{
    curriculumName: String
    team: ID
    description: String
    createdBy: ID
}

input CreateSubjectInput{
    subjectName: String!
    curriculum: ID!
    description: String
}

input UpdateSubjectInput{
    subjectName: String
    description: String
    createdBy: ID
    refrences: String #this is to push refrence link to Refrences Array 
    # chapter: ID #this is to push chapterID to chapters Array
}

input CreateChapterInput{
    chapterName: String!
    subject: ID!
    description: String
    duration: String # h_min format
}

input UpdateChapterInput{
    chapterName: String
    subject: ID
    description: String
    duration: String # h_min format
}


`