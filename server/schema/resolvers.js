const {UserList, MovieList} = require('./fakeData');


const resolvers = {
    Query: {
        users: () => {
           return UserList;
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
    }
}


module.exports = {resolvers};