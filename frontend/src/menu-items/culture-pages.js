// assets
import { GiCorn } from 'react-icons/gi';

// constant
const icons = {
    GiCorn
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const culturePages = {
    id: 'pages',
    title: 'Культуры',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'culture',
            title: 'Культуры',
            type: 'item',
            url: '/culture',
            icon: icons.GiCorn
        }
    ]
};

export default culturePages;
