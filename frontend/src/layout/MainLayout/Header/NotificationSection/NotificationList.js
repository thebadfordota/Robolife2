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

const NotificationList = () => {
    const theme = useTheme();

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
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Иван Иванов">ИИ</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Иван Иванов" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography style={{ marginBottom: '3.5em' }} variant="caption" display="block" gutterBottom>
                                    {'11.11.2022 16:29'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">Прокомментировал параметр "Температура" от 16.10.2022 16:00</Typography>
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
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Обджект Обджектович">ОО</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Обджект Обджектович" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography style={{ marginBottom: '3.5em' }} variant="caption" display="block" gutterBottom>
                                    {'11.11.2022 16:29'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">Изменил параметр "Осадки" от 16.10.2022 16:00</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Chip label="Изменение" sx={chipChangeSX} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />
        </List>
    );
};

export default NotificationList;
