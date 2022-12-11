import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const UserProfilePage = Loadable(lazy(() => import('views/user-page/Profile')));

const UserProfileRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/user/profile',
            element: <UserProfilePage />
        }
    ]
};

export default UserProfileRoutes;
