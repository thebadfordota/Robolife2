import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import SystemParams from '../views/dashboard/SystemParams';

// dashboard routing
const WelcomePage = Loadable(lazy(() => import('views/welcome-page/WelcomePage')));

const TemperaturePage = Loadable(lazy(() => import('views/dashboard/Temperature')));

const PrecipitationPage = Loadable(lazy(() => import('views/dashboard/Precipitation')));

const WindSpeedPage = Loadable(lazy(() => import('views/dashboard/WindSpeed')));

const SystemParamsPage = Loadable(lazy(() => import('views/dashboard/SystemParams')));

const HumidityPage = Loadable(lazy(() => import('views/dashboard/Humidity')));

const SolarRadiationPage = Loadable(lazy(() => import('views/dashboard/SolarRadiation')));

const TestKommentSolarRadiationPage = Loadable(lazy(() => import('views/dashboard/TestKommentSolarRadiation')));
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
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'system_params',
                    element: <SystemParamsPage />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'humidity',
                    element: <HumidityPage />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'test_komment_solar_radiation',
                    element: <TestKommentSolarRadiationPage />
                }
            ]
        }
    ]
};

export default MainRoutes;
