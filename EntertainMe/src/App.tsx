 import {ReactNode, useState, useEffect } from 'react'
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
import { initializeApp } from 'firebase/app';
import Login from './login/index.jsx'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7lrzJz8lTKwAAcSQE90pjOoUgBuExhA0",
//   authDomain: "entertainme-399518.firebaseapp.com",
//   projectId: "entertainme-399518",
//   storageBucket: "entertainme-399518.appspot.com",
//   messagingSenderId: "803804088935",
//   appId: "1:803804088935:web:4465ac7f03b1deb7c8a2c2",
//   measurementId: "G-WL9V53RF7G"
// };


// initializeApp(firebaseConfig)




interface LayoutProps {
  children?: ReactNode;
}

function App() {
  //const [count, setCount] = useState(0)
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(), // will cache the data so that we don't have to fetch it again
  //   uri: 'http://localhost:4000/graphql' 
  // })

  const [firebaseIntialized, setFirebaseInitialized] = useState(false)


  // useEffect(() => {
  //   // Listen for Firebase initialization to set the initialization state
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
  //     setFirebaseInitialized(true);
  //   });

  //   // Unsubscribe when component unmounts
  //   return () => unregisterAuthObserver();
  // }, []);

  // // Render a loading indicator until Firebase is initialized
  // if (!firebaseInitialized) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <ApolloProvider client={client}>
    <AntdApp>
    <BrowserRouter>
    <Routes>
      
   
      <Route  element={<LandingPage/>}>
        {/* <Route index element={<LandingPage/>}/> */}
      <Route path="/map" element={<Map/>}/>
      
                    
                    
                
      </Route>
      <Route path="/login" element={<Login/>}/>
      
      <Route path="*" element={<LandingPage />} />
      
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
