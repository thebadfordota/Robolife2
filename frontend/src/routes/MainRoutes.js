import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import WelcomePage from '../views/welcome-page/WelcomePage';

// dashboard routing
const WelcomePage = Loadable(lazy(() => import('views/welcome-page/WelcomePage')));

const TemperaturePage = Loadable(lazy(() => import('views/dashboard/Temperature')));

const PrecipitationPage = Loadable(lazy(() => import('views/dashboard/Precipitation')));

const WindSpeedPage = Loadable(lazy(() => import('views/dashboard/WindSpeed')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <WelcomePage />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'temperature',
                    element: <TemperaturePage />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'precipitation',
                    element: <PrecipitationPage />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'wind_speed',
                    element: <WindSpeedPage />
                }
            ]
        }
    ]
};

export default MainRoutes;
