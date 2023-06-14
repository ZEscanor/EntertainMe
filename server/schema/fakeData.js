

const  UserList = [
    {
        id: 1,
        name: 'John Doe',
        nationality: 'American',
        email: '2r2r@gmail.com',
        age: 22,
        friends: [
            {
                id: 2,
                name: 'Jane Doe',
                nationality: 'American',
            },

        ]
        
    
    },
    {
        id: 2,
        name: 'Jane Doe',
        nationality: 'American',
        email: '12r2f1qf@gmail.com',
        age: 22,
    },
    {
        id: 3,
        name: 'John Smith',
        nationality: 'British',
        age: 22,
        email: 'fafasfaf@gmail.com'

    },
    {
        id: 4,
        name: 'Jane Smith',
        nationality: 'British',
        age: 22,
        email: 'fafasfaf@gmail.com'
    },
    {
        id: 5,
        name: 'Johns Doe',
        nationality: 'American',
        age: 22,
        email: 'fafasfaf@gmail.com'
    },
    
    
]

const MovieList = [
    {
        id: 1,
        title: 'The Matrix',
        year: 1999,
        rating: 8.7,
        theatres: true,

        actors: [
            {
                id: 1,
                name: 'Keanu Reeves',

            },
            {
                id: 2,
                name: 'Laurence Fishburne',

            },
            {
                id: 3,
                name: 'Carrie-Anne Moss',

            },
        ]
    },
    {
        id: 2,
        title: 'The Matridx Reloaded',
        year: 2003,
        rating: 7.2,
        theatres: true,
        actors: [
            {
                id: 1,
                name: 'Keanu Peeves',

            },
        ]
    },
]

module.exports = {
    UserList,
    MovieList,

}