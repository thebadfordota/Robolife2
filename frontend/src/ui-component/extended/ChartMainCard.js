import React from 'react';
import ChartDateRangePicker from '../pickers/ChartDateRangePicker';
import DataFrequencyPicker from '../pickers/DataFrequencyPicker';
import MainCard from '../cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';

const ChartMainCard = ({ title, settings = false }) => {
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);

    const station = useSelector((state) => state.station);
    const stationData = station.id + ' • ' + station.name + ' • ' + station.deviceType + ' • Последние данные: ' + station.lastData;

    const dispatch = useDispatch();

    const handleSetDate = (event) => {
        dispatch({ type: 'SET_DATE', date: event });
    };

    const handleSetFreq = (event) => {
        dispatch({ type: 'SET_FREQ', freq: event });
    };

    return (
        <MainCard title={title} subheader={stationData} settings={settings}>
            <ChartDateRangePicker date={date} setDate={handleSetDate} />
            <DataFrequencyPicker freq={freq} setFreq={handleSetFreq} />
        </MainCard>
    );
};

export default ChartMainCard;
