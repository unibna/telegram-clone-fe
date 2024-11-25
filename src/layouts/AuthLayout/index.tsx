import React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import './index.css';

const { Content } = Layout;

const AuthLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="auth-layout">
        <div className="auth-container">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
