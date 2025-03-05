import React, {useState, useEffect} from 'react'

import {Navigate, Link, useNavigate} from 'react-router-dom'

import {Form, InputNumber, Input, Button, Card,Space ,Typography} from 'antd';

import {GoogleOutlined} from "@ant-design/icons";


import {createUserWithEmailandPass, googleSignIn, signInWithEmailandPass,signOut} from './auth'



//import {useAuth} from '../contexts/authContext'


const {Title, Text} = Typography

const Login = () => {



  const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [userfromGoogle, setUserFromGoogle] = useState(null)
    const [isSigningIn, setisSigningIn] = useState('')
    const [error, setError] = useState('')
    const [isSigningUp, setisSigningUp] = useState('')
    const [formData, setFormData] = useState({
    user: {
      name: '',
      password: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        [name]: value,
      },
    }));
  };


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


    const  onFinish = async () => {
     
      const {user} = formData
      console.log('Success:', user.email, user.password);
      
      let result = await signInWithEmailandPass(user.email,user.password)
      if (result.success) {
        console.log(`Welcome, ${JSON.stringify(result.user)}!`);
        // Redirect to a different page or update UI
      } else {
        console.log(`Error: ${result.errorMessage}`);
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const handleGoogleSignIn = async (e) => {
      if (!isSigningIn) {
          setisSigningIn(true);
          try {
              const user = await googleSignIn();
              setisSigningIn(false);
              if (localStorage.getItem('user')) {
                  setUserFromGoogle(JSON.parse(localStorage.getItem('user')));
                  setUserLoggedIn(true);
                  navigate('/map', { replace: true });
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
     // createUserWithEmailandPass("demodemo123@gmail.com", "demoDemo")

    }


  }

  useEffect(() => {
    console.log(userfromGoogle);
}, [userfromGoogle]);


  return (
 
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
  <Card style={{ width: 400, padding: 20, textAlign: "center" }}>
    <Title level={2}>{isSigningUp ? "Sign Up" : "Sign In"}</Title>

    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
        <Input name="email" value={formData.user.email} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
        <Input.Password name="password" value={formData.user.password} onChange={handleInputChange} />
      </Form.Item>

      {error && <Text type="danger">{error}</Text>}

      <Button type="primary" htmlType="submit"  >
        {isSigningUp ? "Sign Up" : "Sign In"}
      </Button>
    </Form>

    <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
      <Button icon={<GoogleOutlined />} block onClick={handleGoogleSignIn} loading={isSigningIn}>
        {isSigningIn ? "Signing In with Google..." : "Sign In with Google"}
      </Button>

      <Text>
        {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button>{isSigningUp ? "Sign In" : "Sign Up"}</Button>
      </Text>
    </Space>
  </Card>
</div>

)};
  


export default Login








