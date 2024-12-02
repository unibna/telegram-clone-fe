import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout, Spin, message } from 'antd';

import { useAppDispatch } from '../../hooks';
import { fetchMe } from '../../slices/userSlice';
import { refreshToken, logout } from '../../slices/authSlice';

import './index.css'

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { status: userStatus, userInfo } = useSelector((state: any) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Track when user data is loaded

  const checkAuthentication = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/auth/login');
      return;
    }

    try {
      await dispatch(fetchMe()).unwrap();
      setIsUserLoaded(true); // Set flag when user data is fetched
    } catch (error: any) {
      if (error === 'Token expired') {
        try {
          await dispatch(refreshToken()).unwrap();
          await dispatch(fetchMe()).unwrap();
          setIsUserLoaded(true);
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

  if (userStatus === 'loading' || !isUserLoaded) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (!userInfo) {
    navigate('/auth/login');
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;
