import React, { useEffect, useState } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import Chart from '../../ui-component/Chart';
import { DATA_FREQUENCY_CONVERT, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import WindRose from '../../ui-component/WindRose';
import axios from 'axios';

const Wind = () => {
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
    }, [date[0], date[1], freq, station.id]);

    useEffect(() => {
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.weather_metrics_url + '?maxWindSpeed', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then((responseSpeed) => {
                axios
                    .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.weather_metrics_url + '?dominantWindDirection', {
                        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                    })
                    .then((responseDirection) => {
                        console.log(responseDirection.data, responseSpeed.data);
                    });
            });
    });

    return (
        <div>
            <ChartMainCard title="Ветер" />
            <SubCard title="Скорость ветра">
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
            <MainCard title="Исторические данные о ветре (роза ветров)" subheader="Данные получены из API Robolife2">
                {/*<Chart chartRootName="chart2" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />*/}
                <WindRose chartRootName="chart3" />
            </MainCard>
        </div>
    );
};

export default Wind;
