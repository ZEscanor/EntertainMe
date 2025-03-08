 import {ReactNode, useState, useEffect } from 'react'
import Map from './components/Map/Map';
import './App.css';
import { Route, Routes, Outlet, BrowserRouter, Navigate } from 'react-router-dom';
import { App as AntdApp, Layout } from "antd";
import LandingPage from './pages/LandingPage';
import { initializeApp } from 'firebase/app';
import Login from './login/index.jsx'
import { getAnalytics } from "firebase/analytics";
import Settings from './components/settings/Settings.js';
import Signup from './login/Signup.js';


// initializeApp(firebaseConfig)




interface LayoutProps {
  children?: ReactNode;
}
const { Content } = Layout;



const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
 
      <LandingPage>{/* Persistent component */}
      <Content style={{ padding: "24px" }}>
        {children}
      </Content>
      </LandingPage> 

  );
};

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

    // <AntdApp>
    // <BrowserRouter>
    // <Routes>
    //      {/* <Route index element={<LandingPage/>}/> */}
    //      <Route path="/" element={<Navigate to="/map" replace />} />
    //   <Route  element={<LandingPage/>}>
    //     {/* <Route index element={<LandingPage/>}/> */}
    //   <Route path="/" element={<Map/>}/>
     
    //   </Route>

      
    //   <Route path="/login" element={<Login/>}/>
    //   <Route path="/settings" element={<Settings/>}/>
      
    //   <Route path="*" element={<LandingPage />} />
      


    // </Routes>
   
    // </BrowserRouter>
    // </AntdApp>



<AntdApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route path="/map" element={<MainLayout> <Map /> </MainLayout>}  />
          <Route  path="/login" element={ <Login />} />
          <Route path="/settings" element={<MainLayout> <Settings /> </MainLayout>} />
          <Route  path="/signup" element={ <Signup />} />
          <Route path="*" element={<MainLayout> <Map /> </MainLayout>} />
        </Routes>
      </BrowserRouter>
    </AntdApp>

  )
}

export default App
