import React, { useEffect, useState } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import LineChart from '../../ui-component/LineChart';
import { DATA_FREQUENCY_CONVERT, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData, getWindRoseData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import WindRose from '../../ui-component/WindRose';
import axios from 'axios';

const Wind = () => {
    const [data, setData] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);
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
            .get(
                ROBOLIFE2_BACKEND_API.base_url +
                    ROBOLIFE2_BACKEND_API.weather_metrics_url +
                    `?maxWindSpeed&dominantWindDirection&startDate=${date[0].toISOString().split('T')[0]}&endDate=${
                        date[1].toISOString().split('T')[0]
                    }`,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            )
            .then((response) => {
                setDataHistory(
                    getWindRoseData(
                        Object.values(response.data.metric).length
                            ? Object.values(response.data.metric)
                                  .filter((value) => value.name === 'Max Wind Speed')
                                  .map((value) => Number(value.value))
                            : [],
                        generateNormal(
                            Object.values(response.data.region_norm).filter((value) => value.name === 'Max Wind Speed'),
                            Object.values(response.data.metric).map((value) => value.date)
                        ),
                        Object.values(response.data.metric)
                            .filter((value) => value.name === 'Dominant Wind Direction')
                            .map((value) => Number(value.value))
                    )
                );
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Ветер" />
            <MainCard title="Скорость ветра" subheader="Данные получены из API Fieldclimate">
                <LineChart
                    titleChart="Скорость ветра, м/с"
                    chartRootName="chart1"
                    data={data}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                />
            </MainCard>
            <MainCard title="Исторические данные о ветре (роза ветров)" subheader="Данные получены из API Robolife2">
                <WindRose titleChart="Роза ветров" chartRootName="chart2" data={dataHistory} />
            </MainCard>
        </div>
    );
};

export default Wind;
