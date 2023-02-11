import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { IconButton } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import { Link } from 'react-router-dom';
// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            subheader,
            settings,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && !subheader && <CardHeader sx={headerSX} title={title} action={secondary} />}
                {darkTitle && title && !subheader && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}
                {!darkTitle && title && subheader && (
                    <Grid container spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <CardHeader sx={headerSX} title={title} subheader={subheader} action={secondary} />
                        </Grid>
                        {settings ? (
                            <Grid item marginRight={'20px'}>
                                <Link to={{ pathname: 'settings' }}>
                                    <IconButton icon={<GearIcon />} />
                                </Link>
                            </Grid>
                        ) : null}
                    </Grid>
                )}
                {darkTitle && title && subheader && (
                    <CardHeader
                        sx={headerSX}
                        title={<Typography variant="h3">{title}</Typography>}
                        subheader={<Typography variant="p">{subheader}</Typography>}
                        action={secondary}
                    />
                )}
                {/* content & header divider */}
                {title && <Divider />}
                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
