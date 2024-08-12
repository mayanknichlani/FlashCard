import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  // Replace this with your actual authentication and role checking logic
  const isAuthenticated = true; // Check if user is authenticated
  const userRole = 'admin'; // Replace with actual user role

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
