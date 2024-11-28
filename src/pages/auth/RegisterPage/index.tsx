import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, message } from 'antd';

import { AuthService } from '../../../services';

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      const { email, username, password } = values;
      const requestData = { email, username, password };

      const response = await AuthService.register(requestData);

      if (response) {
        message.success('You have successfully registered!');
        navigate('/auth/login');
      }
    } catch (error: any) {
      const response = error?.response;
      message.error(response?.data?.message);
    }
  };

  return (
    <Form
      form={form}
      name="auth-register"
      onFinish={handleRegister}
      style={{ maxWidth: 400, margin: 'auto' }}
      layout="vertical"
    >
      <h2 style={{ textAlign: 'center' }}>Register</h2>

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
        name="username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please enter your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="passwordConfirm"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords do not match!')
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
