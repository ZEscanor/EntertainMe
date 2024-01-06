import React, {useState} from 'react';
import {useQuery,useLazyQuery, useMutation, gql} from '@apollo/client';

const QUERY_ALL_USERS = gql`
   query GetUsers {
  users {
  ... on UsersSuccess{
  
    users{
      id
      name
      nationality
      }

  }
  }
}
    `;

const QUERY_ALL_MOVIES = gql`
    query GetMovies {
        movies {
    id
    theatres
    title
    actors {
      id
      name
    }
  }
    }

  
    
    `
const QUERY_MOVIE = gql`
    query GetMovieByName ($title: String!) {

        movie(title: $title) {
            
            id
            theatres
            title
            }
    }


`


const CREATE_USER = gql`

mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
        name
        email
        age
        }
}

`



function ApolloData() {

    const {loading, error, data, refetch} = useQuery(QUERY_ALL_USERS);
    const { data: dataMovies} = useQuery(QUERY_ALL_MOVIES);
    const [name, setName] = useState("");
    const [fetchMovie, {data:movieSearched}] = useLazyQuery(QUERY_MOVIE);
    const [createUserMutation] = useMutation(CREATE_USER);
    
    //Create User State Mutation
    const [createUser, setCreateUser] = useState({
        name: "",
        age: 0 ,
        email: ""
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    if(data) //console.log(data, "data from apollo data")

 
  return (
    <div>
        <div>
            <input
            type="text"
            placeholder="name"
          onChange = {(e) => setCreateUser({...createUser, name: e.target.value})}

            />
            <input
            type="email"
            placeholder="email"
            onChange={(e) =>
                setCreateUser({...createUser, email: e.target.value.toUpperCase()}) 

            }
            
            />
            <input
            type="number"
            placeholder="age"
            onChange={(e) =>
                setCreateUser({...createUser, age: parseInt(e.target.value)})
            }
            />
            
            <button onClick={() => {
                createUserMutation({
                    variables: {
                        input: createUser
                    }
                })

                refetch();
            }}>
                Create User 
            </button>
        </div>
      {data && data?.users?.users.map((user: {
            name: string;
            id: string;
            nationality: string;
        }) =>  (
        <div key={user.id}>
            <p>
                {user.name}: {user.id} : {user.nationality}

            </p>
        </div>
            )
      )   }

      {
            dataMovies && dataMovies.movies.map((movie: {
                id: string;
                theatres: string;
                title: string;

                actors: {
                    id: string;
                    name: string;
                }[]
            }) => (
                <div key={movie.id}>
                    <p>
                        {movie.id} : {movie.theatres} : {movie.actors[0].name} : {movie.title}
                    </p>
                </div>
            ))

      }
      <div>
        <input type="text" placeholder="name" 
        onChange={(e) => setName(e.target.value)} 
         />
        <button
        onClick={() => fetchMovie({
            variables: {title: name}

            
        })}
        >Submit</button>
        <div>
            {movieSearched &&  <h1> 
                {movieSearched.movie.title}
                </h1>
            
            }

        </div>

        </div>
    </div>
  );
}

export default ApolloData;