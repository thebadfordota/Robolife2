import React, { useEffect, useState } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import LineChart from '../../ui-component/LineChart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';

const SystemParams = () => {
    const [data, setData] = useState({});
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setData(getChartData(response.data.length ? { battery: response.data[3].values.last } : {}, response.dates));
            });
    }, [date[0], date[1], freq, station.id]);

    return (
        <div>
            <ChartMainCard title="Системные параметры" />
            <SubCard title="Заряд АКБ">
                <LineChart
                    titleChart="Заряд АКБ, mV"
                    chartRootName="chart1"
                    data={data}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                />
            </SubCard>
        </div>
    );
};

export default SystemParams;
