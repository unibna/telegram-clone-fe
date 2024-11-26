import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthLayout, DefaultLayout } from './layouts';

import { LoginPage, RegisterPage } from './pages/auth';
import { ChatPage } from './pages/chat';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/chat" element={<DefaultLayout />}>
          <Route path="" element={<ChatPage />} />
        </Route>

      </Routes> 
    </Router>
  );
};

export default AppRouter;
