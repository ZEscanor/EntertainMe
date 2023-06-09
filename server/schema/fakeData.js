

const  UserList = [
    {
        id: 1,
        name: 'John Doe',
        nationality: 'American',
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
    },
    {
        id: 3,
        name: 'John Smith',
        nationality: 'British',
    },
    {
        id: 4,
        name: 'Jane Smith',
        nationality: 'British',
    },
    {
        id: 5,
        name: 'Johns Doe',
        nationality: 'American',
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