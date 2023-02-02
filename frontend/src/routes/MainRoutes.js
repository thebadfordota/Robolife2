import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RequiredAuth from '../utils/RequiredAuth';
// dashboard routing
const WelcomePage = Loadable(lazy(() => import('views/welcome-page/WelcomePage')));

const TemperaturePage = Loadable(lazy(() => import('views/dashboard/Temperature')));

const PrecipitationPage = Loadable(lazy(() => import('views/dashboard/Precipitation')));

const WindPage = Loadable(lazy(() => import('views/dashboard/Wind')));

const SystemParamsPage = Loadable(lazy(() => import('views/dashboard/SystemParams')));

const HumidityPage = Loadable(lazy(() => import('views/dashboard/Humidity')));

const SolarRadiationPage = Loadable(lazy(() => import('views/dashboard/SolarRadiation')));

const SoilMoisturePage = Loadable(lazy(() => import('views/dashboard/SoilMoisture')));

const SoilMoistureCalculationPage = Loadable(lazy(() => import('views/calculation-pages/soil-moisture-page/SoilMoisture')));

const CornPage = Loadable(lazy(() => import('views/culture-pages/CornPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <RequiredAuth>
            <MainLayout />
        </RequiredAuth>
    ),
    children: [
        {
            path: '/',
            element: (
                <RequiredAuth>
                    <WelcomePage />
                </RequiredAuth>
            )
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'temperature',
                    element: (
                        <RequiredAuth>
                            <TemperaturePage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'precipitation',
                    element: (
                        <RequiredAuth>
                            <PrecipitationPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'wind',
                    element: (
                        <RequiredAuth>
                            <WindPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'system_params',
                    element: (
                        <RequiredAuth>
                            <SystemParamsPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'humidity',
                    element: (
                        <RequiredAuth>
                            <HumidityPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'solar_radiation',
                    element: (
                        <RequiredAuth>
                            <SolarRadiationPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'soil_moisture',
                    element: (
                        <RequiredAuth>
                            <SoilMoisturePage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'calculation',
            children: [
                {
                    path: 'soil_moisture',
                    element: (
                        <RequiredAuth>
                            <SoilMoistureCalculationPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'culture',
            children: [
                {
                    path: 'corn',
                    element: (
                        <RequiredAuth>
                            <CornPage />
                        </RequiredAuth>
                    )
                }
            ]
        }
    ]
};

export default MainRoutes;
