import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GetEventData from './api/getEventData';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation } from '@apollo/client';
import ApolloData from './components/ApolloData';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const client = new ApolloClient({
    cache: new InMemoryCache(), // will cache the data so that we don't have to fetch it again
    uri: 'http://localhost:4000/graphql' 
  })

  return (
    <ApolloProvider client={client}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
     <div className="card">
        <ApolloData />
   </div>
   <GetEventData />
    </ApolloProvider>
  )
}

export default App
