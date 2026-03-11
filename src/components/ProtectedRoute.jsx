// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check karte hain ki token localStorage me hai ya nahi
  const token = localStorage.getItem('token');

  if (!token) {
    // Agar token nahi hai, to login page par redirect kar do
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, to andar ka component (jaise Dashboard) render hone do
  return children;
};

export default ProtectedRoute;