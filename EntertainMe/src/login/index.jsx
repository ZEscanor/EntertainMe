import React, {useState, useEffect} from 'react'

import {Navigate, Link, useNavigate} from 'react-router-dom'

import {Form, InputNumber, Input, Button} from 'antd';


import {createUserWithEmailandPass, googleSignIn, signInWithEmailandPass,signOut} from './auth'



//import {useAuth} from '../contexts/authContext'




const Login = () => {



  const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [userfromGoogle, setUserFromGoogle] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setisSigningIn] = useState('')
    const [error, setError] = useState('')
    const [isSigningUp, setisSigningUp] = useState('')
    const navigate = useNavigate();



    
const logout = () => {
  signOut();
  localStorage.removeItem('user'); // Remove user data from localStorage
  setUserFromGoogle(null); // Clear user data from state
  setUserLoggedIn(false); // Update user login state


  navigate('/login', { replace: true });
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
                  navigate('/home', { replace: true });
                  // Set a timer to automatically log out after 300 seconds (5 minutes)
                  setTimeout(() => {
                      // Call a function to handle logout
                      logout();
                  }, 300000); // 300 seconds = 5 minutes
              }
          } catch (error) {
              setisSigningIn(false);
              // Handle error or retry if needed
          }
      }
  }

  const handleClickevent = (even) => {
      
    if(even == "SignIn"){
      setisSigningUp(true)
    }


  }

  useEffect(() => {
    console.log(userfromGoogle);
}, [userfromGoogle]);


  return (
 
    <div>
   {/* {userLoggedIn && (<Navigate to={'/'} replace={true}/> )} */}
   <Form onSubmit={onSubmit}>
 
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
  <button type="submit" onClick={()=>handleClickevent("SignIn")}>
    {isSigningIn ? null : "SignIn" }
  </button>
 
  <button onClick={(e) => { e.preventDefault(); handleGoogleSignIn(); }} disabled={isSigningIn}>
  {isSigningIn ? 'Signing In with Google...' : 'Sign In with Google'}
</button>
  <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
</Form>
{isSigningUp ? (
  <Form>
       <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'password']}
      label="password"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
) : null}
    </div>
  )
}

export default Login





const SignUpManually = () => {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
   <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    // validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
  
    <Form.Item
      name={['user', 'age']}
      label="Age"
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item name={['user', 'website']} label="Website">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label="Introduction">
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

  </>
  )
}