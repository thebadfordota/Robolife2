import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from '../layout/MainLayout';
import { Navigate } from 'react-router';
import RequiredNoAuth from '../utils/RequiredNoAuth';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: (
                <RequiredNoAuth>
                    <AuthLogin3 />
                </RequiredNoAuth>
            )
        },
        {
            path: '/register',
            element: (
                <RequiredNoAuth>
                    <AuthRegister3 />
                </RequiredNoAuth>
            )
        }
    ]
};

export default AuthenticationRoutes;
