import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthLayout } from './layouts';

import { LoginPage, RegisterPage } from './pages/auth';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

      </Routes> 
    </Router>
  );
};

export default AppRouter;
