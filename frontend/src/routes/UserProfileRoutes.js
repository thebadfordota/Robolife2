import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RequiredAuth from '../utils/RequiredAuth';

const UserProfilePage = Loadable(lazy(() => import('views/user-page/Profile')));

const UserProfileRoutes = {
    path: '/',
    element: (
        <RequiredAuth>
            <MainLayout />
        </RequiredAuth>
    ),
    children: [
        {
            path: '/user/profile',
            element: (
                <RequiredAuth>
                    <UserProfilePage />
                </RequiredAuth>
            )
        }
    ]
};

export default UserProfileRoutes;
