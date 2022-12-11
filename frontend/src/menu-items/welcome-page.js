// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };

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
            icon: icons.IconHome,
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
