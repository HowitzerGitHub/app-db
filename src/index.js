const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('../typeDefs/schema.js')

import {Query} from '../resolvers/Query'
import {Mutation }from '../resolvers/Mutation'

import User from '../resolvers/User'
import Team from '../resolvers/Team'
import Curriculum from '../resolvers/Curriculum'
import Subject from '../resolvers/Subject'
import Chapter from '../resolvers/Chapter'

// const pubsub =  new PubSub()

// mongodb+srv://projectDB1:DbUz8mxv7WT6t5X@cluster0.56hu5nl.mongodb.net/?retryWrites=true&w=majority
// DbUz8mxv7WT6t5X
const MONGODB = "mongodb+srv://projectDB1:DbUz8mxv7WT6t5X@cluster0.56hu5nl.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(MONGODB).then(()=>{
    console.log('MongoDB Connected......')
    return server.listen({port:5000})
}).then((res)=>{
    console.log(`Server is running at ${res.url}`)
})

const server = new ApolloServer({
    typeDefs,
    resolvers : {
        Query,
        User,
        Team,
        Curriculum,
        Subject, 
        Chapter,
        Mutation,
    },
    context: {
        // pubsub
    }
})
