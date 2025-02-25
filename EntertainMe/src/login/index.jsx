import React, {useState, useEffect} from 'react'

import {Navigate, Link, useNavigate} from 'react-router-dom'

import {Form, InputNumber, Input, Button} from 'antd';


import {createUserWithEmailandPass, googleSignIn, signInWithEmailandPass,signOut} from './auth'



//import {useAuth} from '../contexts/authContext'




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


    const  onFinish = async (values) => {
      console.log('Success:', values.user);
      let user = values.user
      let result = await signInWithEmailandPass(user.name,user.password)
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
     // createUserWithEmailandPass("demodemo123@gmail.com", "demoDemo")

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
    {isSigningIn ? "Sign In": "Sign Up"}
  </button>
 
  <button onClick={(e) => { e.preventDefault(); handleGoogleSignIn(); }} disabled={isSigningIn}>
  {isSigningIn ? 'Signing In with Google...' : 'Sign In with Google'}
</button>
  <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
</Form>
{isSigningUp ? (
  <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }}
  >
  <Form 
  labelCol={{
    span: 8,
  }}
  wrapperCol={{
    span: 16,
  }}
  style={{
    maxWidth: 600,
    width: '100%',
  
  }}
  initialValues={{
    remember: true,
  }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
  
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
    <Input
      name="name"
      value={formData.user.name}
      onChange={handleInputChange}
    />
  </Form.Item>
  <Form.Item
    name={['user', 'password']}
    label="Password"
    rules={[
      {
        required: true,
      },
    ]}
  >
    <Input
      name="password"
      type="password"
      value={formData.user.password}
      onChange={handleInputChange}
    />
  </Form.Item>

  <Button type="primary" htmlType="submit">
        Submit
      </Button>
</Form>
</div>
) : null}
    </div>
  )
}

export default Login





// const SignUpManually = () => {

//   const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };

//   const onFinish = (values) => {
//     console.log(values);
//   };

//   return (
//     <>
//    <Form
//     {...layout}
//     name="nest-messages"
//     onFinish={onFinish}
//     style={{
//       maxWidth: 600,
//     }}
//     // validateMessages={validateMessages}
//   >
//     <Form.Item
//       name={['user', 'name']}
//       label="Name"
//       rules={[
//         {
//           required: true,
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       name={['user', 'email']}
//       label="Email"
//       rules={[
//         {
//           type: 'email',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>
  
//     <Form.Item
//       name={['user', 'age']}
//       label="Age"
//       rules={[
//         {
//           type: 'number',
//           min: 0,
//           max: 99,
//         },
//       ]}
//     >
//       <InputNumber />
//     </Form.Item>
//     <Form.Item name={['user', 'website']} label="Website">
//       <Input />
//     </Form.Item>
//     <Form.Item name={['user', 'introduction']} label="Introduction">
//       <Input.TextArea />
//     </Form.Item>
//     <Form.Item
//       wrapperCol={{
//         ...layout.wrapperCol,
//         offset: 8,
//       }}
//     >
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>

//   </>
//   )
// }