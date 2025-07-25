



import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, role }) => {
  const getToken = () => {
    let token = Cookies.get("authToken") || localStorage.getItem("token");
    return token;
  };

  const token = getToken();
  const user = JSON.parse(localStorage.getItem("user")); // assuming user info is stored after login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // User exists, but doesn't have required role
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
