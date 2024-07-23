import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;