// assets
import { IconDashboard, IconTemperature, IconCloudRain, IconWind, IconDevices, IconDroplet, IconSun, IconSeeding } from '@tabler/icons';

// constant
const icons = { IconSeeding, IconDashboard, IconTemperature, IconCloudRain, IconWind, IconDevices, IconDroplet, IconSun };

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
            id: 'soil_moisture_dashboard',
            title: 'Влажность почвы',
            type: 'item',
            url: '/dashboard/soil_moisture',
            icon: icons.IconSeeding
        }
    ]
};

export default dashboard;
