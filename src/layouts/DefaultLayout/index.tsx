import React from 'react';
import { Layout } from 'antd';
import './index.css';

const { Sider, Content } = Layout;

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="default-sider">Sider</Sider>
      <Content className="default-content">{children}</Content>
    </Layout>
  );
};

export default DefaultLayout;
