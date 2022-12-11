// assets
import { IconDashboard, IconTemperature, IconCloudRain, IconWind, IconDevices, IconDroplet, IconSun } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconTemperature, IconCloudRain, IconWind, IconDevices, IconDroplet, IconSun };

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
            url: '/dashboard/temperature',
            icon: icons.IconTemperature
        },
        {
            id: 'precipitation',
            title: 'Осадки',
            type: 'item',
            url: '/dashboard/precipitation',
            icon: icons.IconCloudRain
        },
        {
            id: 'wind_',
            title: 'Ветер',
            type: 'item',
            url: '/dashboard/wind',
            icon: icons.IconWind
        },
        {
            id: 'system_params',
            title: 'Системные параметры',
            type: 'item',
            url: '/dashboard/system_params',
            icon: icons.IconDevices
        },
        {
            id: 'humidity',
            title: 'Влажность',
            type: 'item',
            url: '/dashboard/humidity',
            icon: icons.IconDroplet
        },
        {
            id: 'solar_radiation',
            title: 'Солнечная радиация',
            type: 'item',
            url: '/dashboard/solar_radiation',
            icon: icons.IconSun
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
