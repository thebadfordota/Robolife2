import React from 'react';
import { Navigate } from 'react-router';

const RequiredNoAuth = ({ children }) => {
    return localStorage.getItem('token') ? <Navigate to="/" /> : children;
};

export default RequiredNoAuth;
