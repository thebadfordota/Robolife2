import React from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const RequiredAuth = ({ children }) => {
    const location = useLocation();
    return !localStorage.getItem('token') ? <Navigate to="/login" state={{ from: location }} /> : children;
};

export default RequiredAuth;
