import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import {createUserWithEmailandPass} from './auth';

const { Title } = Typography;

const onFinish = async (values: { email: string; password: string }) => {
    console.log(values)
    try {
      await createUserWithEmailandPass( values.email, values.password);
      message.success("Signup successful!");
      const navigate = useNavigate();
    } catch (error) {
      message.error((error as Error).message);
    }
   
  };


const Signup = () => {
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>Sign Up</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!", type: "email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!", min: 6 }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"  block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  
}

export default Signup