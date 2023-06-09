// const express = require('express'); // import express from packages
// const  { graphqlHTTP } = require('express-graphql'); // The graphqlHTTP is a function that takes an options object and returns an express middleware function that will handle GraphQL requests.
// const { buildSchema } = require('graphql'); // The buildSchema function takes your schema definition and returns a schema object you can use in the middleware.
// const app = express(); 

// const schema = buildSchema(`
//     type Book {
//         id: ID!
//         title: String!
//         author: String!
//         publicationYear: Int!
//     }
//     type User {
//         id: ID
//         name: String
//         email: String
//         password: String
//         favorites: [Book!]
//     }

//     input UserInput {
//         id: ID
//         name: String
//     }

//     type Query {
//         users: [User!]!
//         user(input: UserInput): User

//     }
// `); // The schema defines the Query type, and the Query type has a single field called hello that returns a String.


// const root = {
//     hello: () => 'Hello world!'  
// } // The root provides a resolver function for each API endpoint.






// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }))
// app.listen(5000, () => console.log('Server started localhost:5000/graphql'))
const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema/typeDefs');
const {resolvers} = require('./schema/resolvers');


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})