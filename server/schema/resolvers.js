const {UserList, MovieList} = require('./fakeData');


const resolvers = {
    Query: {
        users: () => {
            if(UserList) return {users: UserList};

            return {
                message: 'No users found'

            }
        },
        user: (parent, args) => {
           const {id} = args;
           const user = UserList.find(user => user.id == id);
              return user;

        },

        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const {title} = args
            const movie = MovieList.find(movie => movie.title == title);
            return movie;
        },
       

    },
    User: {
        favoriteMovies: () => {
            return MovieList.filter(movie => movie.theatres == true
                
                )
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length -1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
    },
    updateUserName: (parent, args) => {
        const {id, newName} = args.input;
        const user = UserList.find(user => user.id == id);
        if(!user) {
            throw new Error(`User with id ${id} not found`);
        }
        else{
        user.name = newName;
        return user;
        }


    },
    deleteUser: (parent, args) => {
        const {id} = args;
        const user = UserList.find(user => user.id == id);
        if(!user) {
            throw new Error(`User with id ${id} not found`);
        }
        else{
        const index = UserList.indexOf(user);
        UserList.splice(index, 1);
        return user;
        }
    },

   


},

UsersResults: {
    __resolveType(obj){
    if(obj.users){
           return 'UsersSuccess'
    }
    else if(obj.message){
     return 'UsersError'
    
 }
    return null;


}
}
}



module.exports = {resolvers};


// user(parent, args, context, info) 
/*
query -> users -> favoriteMovies -> actors

in the favoriteMovies we have access to the parent resolver
which is just what was returned previously

users will not have access to the parent resolver

actors will have access to the parent resolver which is what favoriteMovies returned

*/

/*
context is an object that is shared by all resolvers

new ApolloServer({
    typeDefs,
    resolvers,
    context: {
       return {
         name: 'John'
       }
    }
})
console logging context in a resolver will return {name: 'John'}

*/

/*

fragments are a way to reuse parts of a query

fragment GetAgeAndName on User {
    name
    age
}

query {
    users {
        ...GetAgeAndName
    }
}


*/