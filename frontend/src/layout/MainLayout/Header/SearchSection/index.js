import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    Card,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    OutlinedInput,
    Popper,
    Select
} from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import stationReducer from '../../../../store/stationReducer';
import fieldClimateAPI from '../../../../clients/FieldClimateClient';
import { getChartData } from '../../../../utils/ChartUtils';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));
const SelectHeader = styled(Menu, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <HeaderAvatarStyle variant="rounded">
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    '&:hover': {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const station = useSelector((state) => state.station);
    const [stations, setStations] = useState([station]);
    const dispatch = useDispatch();
    const theme = useTheme();

    // useEffect(() => {
    //     fieldClimateAPI.getStations().then((response) => {
    //         let getStations = [];
    //         response.forEach((station) => {
    //             getStations.push({
    //                 id: station.name.original,
    //                 name: station.name.custom,
    //                 deviceType: station.info.device_name
    //             });
    //         });
    //         setStations(getStations);
    //     });
    // }, []);
    //
    // useEffect(() => {
    //     fieldClimateAPI.getStationData().then((response) => {});
    // }, []);

    const handleChange = (event) => {
        dispatch({ type: 'SET_STATION', id: event.target.value });
    };

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <FormControl fullWidth sx={{ width: 200, marginLeft: 1 }}>
                    <InputLabel id="label">Станции</InputLabel>
                    <Select labelId="label" value={station.id} label="Станции" onChange={handleChange}>
                        {/*{stations.map((station) => {*/}
                        {/*    return (*/}
                        {/*        <MenuItem key={station.id} value={station.id}>*/}
                        {/*            {station.name}*/}
                        {/*        </MenuItem>*/}
                        {/*    );*/}
                        {/*})}*/}
                        <MenuItem value="00001F76">Сервисный центр</MenuItem>
                        <MenuItem value="00001F77">Отделение 17</MenuItem>
                        <MenuItem value="00001F78">Отделение 9</MenuItem>
                        <MenuItem value="00001F7D">Отделение 12</MenuItem>
                        <MenuItem value="0000235D">ПУ Север</MenuItem>
                        <MenuItem value="0000235E">ПУ Кавказ</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default SearchSection;
