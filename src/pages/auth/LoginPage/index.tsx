import React from "react";

import { Form, Input, Button, message } from 'antd';

import { AuthService } from '../../../services';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;

      const response = await AuthService.login(email, password);
      console.log(response);
    } catch (error: any) {
      message.error(error.message);
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
        name="email"
        rules={[
          { type: 'email', message: 'The input is not a valid E-mail!' },
          { required: true, message: 'Please enter your email!' },
        ]}
      >
        <Input placeholder="Email" />
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
    </Form>
  );
}

export default LoginPage;