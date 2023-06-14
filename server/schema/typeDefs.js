const {gql} = require('apollo-server');

const typeDefs = gql`

    type User {
        
        id: ID 
        name: String!
        email: String!
        age: Int !
        nationality: Nationality
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
        
        users: UsersResults!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(title: String!): Movie!
        }

        input UserInput {
            name: String!
        email: String!
        age: Int ! 
        nationality: Nationality 
        }

        input updateUserNameInput {
            id: ID!
            newName: String!
        }

        type Mutation {
          createUser(input: UserInput!) : User!
          updateUserName(input: updateUserNameInput!) : User 
          deleteUser(id: ID!) : User


        }

       
        

        enum Nationality {
            American
            British
            Canadian
            French 

        }

        type UsersSuccess {
        users: [User!]!
        }

        type UsersError {
            message: String!
    
    }

    union UsersResults = UsersSuccess | UsersError 
    
`;

module.exports = {typeDefs};
