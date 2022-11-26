import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import ChartDateRangePicker from '../../ui-component/pickers/ChartDateRangePicker';
import DataFrequencyPicker from '../../ui-component/pickers/DataFrequencyPicker';
import SubCard from '../../ui-component/cards/SubCard';
import Chart from '../../ui-component/Chart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import { subDays } from 'date-fns';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';

const SystemParams = () => {
    const [data, setData] = useState({});
    const [date, setDate] = useState([subDays(new Date(), 1), new Date()]);
    const [freq, setFreq] = useState('hourly');
    const station = useSelector((state) => state.station);
    const stationData = station.id + ' • ' + station.name + ' • ' + station.deviceType + ' • Последние данные: ' + station.lastData;

    useEffect(() => {
        fieldClimateAPI.getForecast(station.id, Math.round(date[0] / 1000), Math.round(date[1] / 1000), freq).then((response) => {
            setData(getChartData(response.data.length ? { battery: response.data[3].values.last } : {}, response.dates));
        });
    }, [date, freq, station.id]);

    return (
        <div>
            <MainCard title="Системные параметры" subheader={stationData}>
                <ChartDateRangePicker date={date} setDate={setDate} />
                <DataFrequencyPicker freq={freq} setFreq={setFreq} />
            </MainCard>
            <SubCard title="Заряд АКБ">
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
        </div>
    );
};

export default SystemParams;
