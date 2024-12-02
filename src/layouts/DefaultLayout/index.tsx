import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Spin, message } from 'antd';

import { useAppDispatch } from '../../hooks';
import { fetchMe } from '../../store/slices/userSlice';
import { refreshToken, logout } from '../../store/slices/authSlice';

import './index.css'

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { status: userStatus } = useSelector((state: any) => state.user);

  const checkAuthentication = async () => {
    console.log('-----> checkAuthentication');

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/auth/login');
      return;
    }

    try {
      await dispatch(fetchMe()).unwrap();
    } catch (error: any) {
      if (error === 'Token expired') {
        try {
          await dispatch(refreshToken()).unwrap();
          await dispatch(fetchMe()).unwrap();
        } catch (refreshError) {
          message.error('Session expired. Please log in again.');
          dispatch(logout());
          navigate('/auth/login');
        }
      } else {
        message.error(error || 'Authentication failed.');
        dispatch(logout());
        navigate('/auth/login');
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [dispatch]);

  if (userStatus === 'loading') {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;
