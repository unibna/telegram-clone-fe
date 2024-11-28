import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const checkAuthenticated = () => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Layout>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;
