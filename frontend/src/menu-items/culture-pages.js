// assets
import { GiCorn, GiGooeyMolecule } from 'react-icons/gi';

// constant
const icons = {
    GiCorn,
    GiGooeyMolecule
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
        },
        {
            id: 'culture-diseases',
            title: 'Болезни',
            type: 'item',
            url: '/culture/culture-diseases',
            icon: icons.GiGooeyMolecule
        }
    ]
};

export default culturePages;
