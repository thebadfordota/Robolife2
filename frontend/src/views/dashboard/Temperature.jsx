import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import { subDays } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import SubCard from '../../ui-component/cards/SubCard';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import DataFrequencyPicker from '../../ui-component/pickers/DataFrequencyPicker';
import ChartDateRangePicker from '../../ui-component/pickers/ChartDateRangePicker';

const Temperature = () => {
    const [data, setData] = useState({});
    const [date, setDate] = useState([subDays(new Date(), 1), new Date()]);
    const [freq, setFreq] = useState('hourly');
    const station = useSelector((state) => state.station);
    const stationData = station.id + ' • ' + station.name + ' • ' + station.deviceType + ' • Последние данные: ' + station.lastData;

    useEffect(() => {
        fieldClimateAPI.getForecast(station.id, Math.round(date[0] / 1000), Math.round(date[1] / 1000), freq).then((response) => {
            setData(
                getChartData(
                    response.data.length
                        ? {
                              averageTemperature: response.data[5].values.avg,
                              minTemperature: response.data[5].values.min,
                              maxTemperature: response.data[5].values.max
                          }
                        : {},
                    response.dates
                )
            );
        });
    }, [date, freq, station.id]);

    return (
        <div>
            <MainCard title="Температура" subheader={stationData}>
                <ChartDateRangePicker date={date} setDate={setDate} />
                <DataFrequencyPicker freq={freq} setFreq={setFreq} />
            </MainCard>
            <SubCard>
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
        </div>
    );
};

export default Temperature;
