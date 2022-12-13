import React, { useEffect, useState } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import LineChart from '../../ui-component/LineChart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';

const SolarRadiation = () => {
    const [data, setData] = useState({});
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setData(getChartData(response.data.length ? { solarRadiation: response.data[0].values.avg } : {}, response.dates));
            });
    }, [date[0], date[1], freq, station.id]);

    return (
        <div>
            <ChartMainCard title="Солнечная радиация" />
            <MainCard title="Солнечная радиация" subheader="Данные получены из API Fieldclimate">
                <LineChart
                    titleChart="Солнечная рвдиация, w/m2"
                    chartRootName="chart1"
                    data={data}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                />
            </MainCard>
        </div>
    );
};

export default SolarRadiation;
