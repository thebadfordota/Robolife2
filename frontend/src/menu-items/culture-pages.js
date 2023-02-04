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
            id: 'corn',
            title: 'Кукуруза',
            type: 'item',
            url: '/culture/corn',
            icon: icons.GiCorn
        }
    ]
};

export default culturePages;
