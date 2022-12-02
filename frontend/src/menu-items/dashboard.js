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
            id: 'main',
            title: 'Графики',
            type: 'collapse',
            // url: '/dashboard/default',
            icon: icons.IconDashboard,
            // breadcrumbs: false
            children: [
                {
                    id: 'temperature',
                    title: 'Температура',
                    type: 'item',
                    url: '/dashboard/temperature'
                    // target: true  // для редиректа на другую страницу
                },
                {
                    id: 'precipitation',
                    title: 'Осадки',
                    type: 'item',
                    url: '/dashboard/precipitation'
                },
                {
                    id: 'wind_speed',
                    title: 'Скорость ветра',
                    type: 'item',
                    url: '/dashboard/wind_speed'
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
                    id: 'test_komment_solar_radiation',
                    title: 'Комменты(Солнечная радиация)',
                    type: 'item',
                    url: '/dashboard/test_komment_solar_radiation'
                }
            ]
        }
    ]
};

export default dashboard;
