// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const welcomePageSidebarItem = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'welcome-page',
            title: 'Главная страница',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

// children: [
//     {
//         id: 'default',
//         title: 'Welcome Page',
//         type: 'item',
//         url: '/dashboard/default',
//         icon: icons.IconDashboard,
//         breadcrumbs: false
//     }
// ]

export default welcomePageSidebarItem;
