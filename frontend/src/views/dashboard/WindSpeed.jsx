import React, { useEffect, useState } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import Chart from '../../ui-component/Chart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';

const WindSpeed = () => {
    const [data, setData] = useState({});
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setData(
                    getChartData(
                        response.data.length
                            ? { averageWindSpeed: response.data[2].values.avg, maxWindSpeed: response.data[2].values.max }
                            : {},
                        response.dates
                    )
                );
            });
    }, [date, freq, station.id]);

    return (
        <div>
            <ChartMainCard title="Скорость ветра" />
            <SubCard>
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
        </div>
    );
};

export default WindSpeed;
