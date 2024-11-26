import React from 'react';
import { Layout } from 'antd';
import './index.css';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;
