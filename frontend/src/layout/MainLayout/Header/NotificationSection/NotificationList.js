// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';
import { useEffect, useState } from 'react';
import { PARAMS_CONVERT, ROBOLIFE2_BACKEND_API } from '../../../../constants/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notifications }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const OpenModal = (value) => {
        // console.log(event);
        const ModalWindowData = {
            status: true,
            date: value.comment.weather_metric.date,
            value: value.comment.weather_metric.value,
            id: value.comment.weather_metric.id,
            typeParam: PARAMS_CONVERT[value.comment.weather_metric.name]
        };

        dispatch({
            type: 'SET_STATE_MODAL',
            ...ModalWindowData
        });
    };

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipCommentSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.grey.A100,
        marginRight: '5px'
    };

    const chipChangeSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <Divider />
            {notifications.map((value, index) => {
                return (
                    <div key={index}>
                        <ListItemWrapper onClick={() => OpenModal(value)}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`${value.comment.user.first_name} ${value.comment.user.last_name}`}
                                    >{`${value.comment.user.first_name[0]}${value.comment.user.last_name[0]}`}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${value.comment.user.first_name} ${value.comment.user.last_name}`} />
                                <ListItemSecondaryAction>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item xs={12}>
                                            <Typography style={{ marginBottom: '3.5em' }} variant="caption" display="block" gutterBottom>
                                                {new Date(Date.parse(value.comment.created)).toLocaleString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Grid container direction="column" className="list-container">
                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="subtitle2">
                                        Прокомментировал параметр "{PARAMS_CONVERT[value.comment.weather_metric.name]}" от{' '}
                                        {new Date(Date.parse(value.comment.weather_metric.date)).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item>
                                            <Chip label="Комментарий" sx={chipCommentSX} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItemWrapper>
                        <Divider />
                    </div>
                );
            })}
            {/*<ListItemWrapper>*/}
            {/*    <ListItem alignItems="center">*/}
            {/*        <ListItemAvatar>*/}
            {/*            <Avatar alt="Обджект Обджектович">ОО</Avatar>*/}
            {/*        </ListItemAvatar>*/}
            {/*        <ListItemText primary="Обджект Обджектович" />*/}
            {/*        <ListItemSecondaryAction>*/}
            {/*            <Grid container justifyContent="flex-end">*/}
            {/*                <Grid item xs={12}>*/}
            {/*                    <Typography style={{ marginBottom: '3.5em' }} variant="caption" display="block" gutterBottom>*/}
            {/*                        {'11.11.2022 16:29'}*/}
            {/*                    </Typography>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </ListItemSecondaryAction>*/}
            {/*    </ListItem>*/}
            {/*    <Grid container direction="column" className="list-container">*/}
            {/*        <Grid item xs={12} sx={{ pb: 2 }}>*/}
            {/*            <Typography variant="subtitle2">Изменил параметр "Осадки" от 16.10.2022 16:00</Typography>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Grid container>*/}
            {/*                <Grid item>*/}
            {/*                    <Chip label="Изменение" sx={chipChangeSX} />*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</ListItemWrapper>*/}
            {/*<Divider />*/}
        </List>
    );
};
export default NotificationList;
