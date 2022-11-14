import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import WelcomePage from '../views/welcome-page/WelcomePage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

const DashboardWelcomePage = Loadable(lazy(() => import('views/welcome-page/WelcomePage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardWelcomePage />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        }
    ]
};

export default MainRoutes;
