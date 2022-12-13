// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/mylogo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={logo} alt="Berry" width="150" />;
};

export default Logo;
