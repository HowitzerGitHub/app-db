// import { GraphQLServer, PubSub} from 'graphql-yoga'
const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
import {Query} from '../resolvers/Query'
import {Mutation }from '../resolvers/Mutation'
import User from '../resolvers/User'

const typeDefs = require('../typeDefs/schema.js')
// import User from '../resolvers/User'
// import db from './db'

// Resolvers
// const pubsub =  new PubSub()

// mongodb+srv://projectDB1:DbUz8mxv7WT6t5X@cluster0.56hu5nl.mongodb.net/?retryWrites=true&w=majority
// DbUz8mxv7WT6t5X
const MONGODB = "mongodb+srv://projectDB1:DbUz8mxv7WT6t5X@cluster0.56hu5nl.mongodb.net/?retryWrites=true&w=majority";



mongoose.connect(MONGODB).then(()=>{
    console.log('MongoDB Connection Successful')
    return server.listen({port:5000})
}).then((res)=>{
    console.log(`Server is running at ${res.url}`)
})

const server = new ApolloServer({
    typeDefs,
    resolvers : {
        Query,
        User,
        Mutation,
    },
    context: {
        // db,
        // pubsub
    }
})
