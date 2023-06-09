const {gql} = require('apollo-server');

const typeDefs = gql`

    type User {
        
        id: ID! 
        name: String!
        email: String!
        age: Int
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]

        
    }

    type Actor {
        id: ID!
        name: String!
      }


    type Movie {
        id: ID!
        title: String!
        year: Int!
        theatres: Boolean ! 
        actors: [Actor!]!
    }

    type Query {
        
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(title: String!): Movie!
        }

        enum Nationality {
            American
            British
            Canadian
            French 

        }
    
`;

module.exports = {typeDefs};
