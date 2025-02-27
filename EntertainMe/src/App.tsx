 import {ReactNode, useState, useEffect } from 'react'
import Map from './components/Map/Map';
import './App.css';
import { Route, Routes, Outlet, BrowserRouter, Navigate } from 'react-router-dom';
import { App as AntdApp } from "antd";
import LandingPage from './pages/LandingPage';
import { initializeApp } from 'firebase/app';
import Login from './login/index.jsx'
import { getAnalytics } from "firebase/analytics";


// initializeApp(firebaseConfig)




interface LayoutProps {
  children?: ReactNode;
}

function App() {
 
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

    <AntdApp>
    <BrowserRouter>
    <Routes>
         {/* <Route index element={<LandingPage/>}/> */}
         <Route path="/" element={<Navigate to="/map" replace />} />
      <Route  element={<LandingPage/>}>
        {/* <Route index element={<LandingPage/>}/> */}
      <Route path="/" element={<Map/>}/>
     
      </Route>

      
      <Route path="/login" element={<Login/>}/>
      
      <Route path="*" element={<LandingPage />} />
      


    </Routes>
   
    </BrowserRouter>
    </AntdApp>

  )
}

export default App
