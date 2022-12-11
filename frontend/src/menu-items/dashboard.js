// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Графики',
    type: 'group',
    children: [
        {
            id: 'temperature',
            title: 'Температура',
            type: 'item',
            url: '/dashboard/temperature'
        },
        {
            id: 'precipitation',
            title: 'Осадки',
            type: 'item',
            url: '/dashboard/precipitation'
        },
        {
            id: 'wind_',
            title: 'Ветер',
            type: 'item',
            url: '/dashboard/wind'
        },
        {
            id: 'system_params',
            title: 'Системные параметры',
            type: 'item',
            url: '/dashboard/system_params'
        },
        {
            id: 'humidity',
            title: 'Влажность',
            type: 'item',
            url: '/dashboard/humidity'
        },
        {
            id: 'solar_radiation',
            title: 'Солнечная радиация',
            type: 'item',
            url: '/dashboard/solar_radiation'
        },
        {
            id: 'test_komment_solar_radiation',
            title: 'Комменты(Солнечная радиация)',
            type: 'item',
            url: '/dashboard/test_komment_solar_radiation'
        }
    ]
};

export default dashboard;
