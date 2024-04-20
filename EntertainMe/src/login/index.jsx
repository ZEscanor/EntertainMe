import React, {useState, useEffect} from 'react'

import {Navigate, Link, useNavigate} from 'react-router-dom'


import {createUserWithEmailandPass, googleSignIn, signInWithEmailandPass,signOut} from './auth'



//import {useAuth} from '../contexts/authContext'




const Login = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [userfromGoogle, setUserFromGoogle] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setisSigningIn] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();



    
const logout = () => {
  signOut();
  localStorage.removeItem('user'); // Remove user data from localStorage
  setUserFromGoogle(null); // Clear user data from state
  setUserLoggedIn(false); // Update user login state


  navigate('/logidn', { replace: true });
}

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setisSigningIn(true)
            await signInWithEmailandPass(email,password)
        }
    }
    const handleGoogleSignIn = async (e) => {
      if (!isSigningIn) {
          setisSigningIn(true);
          try {
              const user = await googleSignIn();
              setisSigningIn(false);
              if (localStorage.getItem('user')) {
                  setUserFromGoogle(JSON.parse(localStorage.getItem('user')));
                  setUserLoggedIn(true);
                  
                  // Set a timer to automatically log out after 300 seconds (5 minutes)
                  setTimeout(() => {
                      // Call a function to handle logout
                      logout();
                  }, 3000); // 300 seconds = 5 minutes
              }
          } catch (error) {
              setisSigningIn(false);
              // Handle error or retry if needed
          }
      }
  }

  useEffect(() => {
    console.log(userfromGoogle);
}, [userfromGoogle]);


  return (
 
    <div>
   {/* {userLoggedIn && (<Navigate to={'/'} replace={true}/> )} */}
   <form onSubmit={onSubmit}>
 
  {/* <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    
  /> */}
  {error && <p>{error}</p>}
  <button type="submit" disabled={isSigningIn}>
    {isSigningIn ? 'Signing In...' : 'Sign In'}
  </button>
  <button onClick={(e) => { e.preventDefault(); handleGoogleSignIn(); }} disabled={isSigningIn}>
  {isSigningIn ? 'Signing In with Google...' : 'Sign In with Google'}
</button>
  <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
</form>
    </div>
  )
}

export default Login