 import {ReactNode, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import GetEventData from './api/getEventData';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation } from '@apollo/client';
// import ApolloData from './components/ApolloData';
import Map from './components/Map/Map';
//import Navbar from './components/Navbar/Navbar.jsx';
import './App.css';
import { Route, Routes, Outlet, BrowserRouter } from 'react-router-dom';
import { App as AntdApp } from "antd";
import LandingPage from './pages/LandingPage';

interface LayoutProps {
  children?: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <LandingPage /> {/* Render the LandingPage as the header */}
      <div className="content">
        {children} {/* Render child routes/content */}
      </div>
    </div>
  );
};
function App() {
  //const [count, setCount] = useState(0)
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(), // will cache the data so that we don't have to fetch it again
  //   uri: 'http://localhost:4000/graphql' 
  // })

  return (
    // <ApolloProvider client={client}>
    <AntdApp>
    <BrowserRouter>
    <Routes>
      
   
      
      <Route index element={<LandingPage/>}/>
      
      <Route path='/map' element={<Map/>}/>


      
      {/* <Navbar/> */}
    
      
     {/* <div className="card">
        <ApolloData />
   </div> */}
   {/* <GetEventData /> */}
    {/* </ApolloProvider> */}

    </Routes>
    {/* <div className='ok'>
         kokokok
    </div> */}
    </BrowserRouter>
    </AntdApp>

  )
}

export default App
