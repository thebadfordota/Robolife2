import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import { subDays } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import ChartDateRangePicker from '../../ui-component/pickers/ChartDateRangePicker';
import DataFrequencyPicker from '../../ui-component/pickers/DataFrequencyPicker';
import SubCard from '../../ui-component/cards/SubCard';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import { useSelector } from 'react-redux';

const Precipitation = () => {
    const [data, setData] = useState({});
    const [date, setDate] = useState([subDays(new Date(), 1), new Date()]);
    const [dataInc, setDataInc] = useState({});
    const [freq, setFreq] = useState('hourly');
    const station = useSelector((state) => state.station);
    const stationData = station.id + ' • ' + station.name + ' • ' + station.deviceType + ' • Последние данные: ' + station.lastData;

    useEffect(() => {
        fieldClimateAPI.getForecast(station.id, Math.round(date[0] / 1000), Math.round(date[1] / 1000), freq).then((response) => {
            setData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
        });
        fieldClimateAPI.getCalculationRain(station.id, 5, Math.round(date[0] / 1000), Math.round(date[1] / 1000)).then((response) => {
            setDataInc(
                getChartData(
                    Object.values(response.chart).length
                        ? { increaseCountPrecipitation: Object.values(response.chart).map((value) => Number(value)) }
                        : {},
                    Object.keys(response.chart)
                )
            );
        });
    }, [date, freq, station.id]);

    return (
        <div>
            <MainCard title="Осадки" subheader={stationData}>
                <ChartDateRangePicker date={date} setDate={setDate} />
                <DataFrequencyPicker freq={freq} setFreq={setFreq} />
            </MainCard>
            <SubCard>
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>

            <SubCard>
                <Chart chartRootName="chart2" data={dataInc} intervalTimeUnit="hour" intervalCount={1} />
            </SubCard>
        </div>
    );
};

export default Precipitation;
