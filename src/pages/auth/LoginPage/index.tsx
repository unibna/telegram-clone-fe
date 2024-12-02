import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, message, Flex } from 'antd';

import { AuthService } from "../../../services";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { username, password } = values;

      const response = await AuthService.login(username, password);
      if (response) {
        message.success('You have successfully logged in!');
        console.log('response', response);
        localStorage.setItem('access_token', response?.data?.access_token);
        localStorage.setItem('refresh_token', response?.data?.refresh_token);
        navigate('/');
      }
    } catch (error: any) {
      const response = error?.response;
      message.error(response?.data?.message || 'Unexpected error occurred!');
    }
  };

  return (
    <Form
      form={form}
      name="auth-login"
      onFinish={handleLogin}
      style={{ maxWidth: 400, margin: 'auto' }}
      layout="vertical"
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

      </Form.Item>

      <Form.Item>
        <Flex justify="center">
          <a href="/auth/register">You don't have an account? Register here</a>
        </Flex>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;