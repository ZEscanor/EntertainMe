import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GetEventData from './api/getEventData';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation } from '@apollo/client';
// import ApolloData from './components/ApolloData';
import Map from './components/Map/Map';
import Navbar from './components/Navbar/Navbar.jsx';
import './App.css';


function App() {
  const [count, setCount] = useState(0)
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(), // will cache the data so that we don't have to fetch it again
  //   uri: 'http://localhost:4000/graphql' 
  // })

  return (
    // <ApolloProvider client={client}>
    
    <div>
      <div className='Middle'>
      {/* <Navbar/> */}
    
      
     {/* <div className="card">
        <ApolloData />
   </div> */}
   {/* <GetEventData /> */}
   <Map/>
    {/* </ApolloProvider> */}
    </div>

    {/* <div className='ok'>
         kokokok
    </div> */}
    </div>

  )
}

export default App
