// assets
import { IconSeeding } from '@tabler/icons';

// constant
const icons = {
    IconSeeding
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Расчеты',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'login3',
            title: 'Доступная влага в почве',
            type: 'item',
            url: '/calculation/soil_moisture',
            icon: icons.IconSeeding
        }
    ]
};

export default pages;
