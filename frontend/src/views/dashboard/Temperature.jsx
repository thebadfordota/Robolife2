import React, { useEffect, useState } from 'react';
import LineChart from '../../ui-component/LineChart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData } from '../../utils/ChartUtils';
import { useSelector } from 'react-redux';
import SubCard from '../../ui-component/cards/SubCard';
import { DATA_FREQUENCY_CONVERT, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import axios from 'axios';

const Temperature = () => {
    const [data, setData] = useState([]);
    const [dataInc, setDataInc] = useState([]);
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
        fieldClimateAPI
            .getCalculationTemperature(
                station.id,
                'temp',
                22,
                Math.round(addHours(date[0], 3) / 1000),
                Math.round(addHours(date[1], 3) / 1000),
                10,
                24
            )
            .then((response) => {
                setDataInc(
                    getChartData(
                        Object.values(response.chart).length
                            ? {
                                  degreesHours: Object.values(response.chart).map((value) => Number(value.degree_hours)),
                                  degreesDays: Object.values(response.chart).map((value) => Number(value.degree_days)),
                                  degreesDaysUsa: Object.values(response.chart).map((value) => Number(value.degree_days_usa))
                              }
                            : {},
                        Object.keys(response.chart)
                    )
                );
            });
    }, [date[0], date[1], freq, station.id]);

    useEffect(() => {
        axios
            .get(
                ROBOLIFE2_BACKEND_API.base_url +
                    ROBOLIFE2_BACKEND_API.weather_metrics_url +
                    `?maxTemperature&minTemperature&startDate=${date[0].toISOString().split('T')[0]}&endDate=${
                        date[1].toISOString().split('T')[0]
                    }`,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            )
            .then((response) => {
                setDataHistory(
                    getChartData(
                        Object.values(response.data.metric).length
                            ? {
                                  historyTemperatureMax: Object.values(response.data.metric)
                                      .filter((value) => value.name === 'Max Temperature')
                                      .map((value) => Number(value.value)),
                                  historyTemperatureMin: Object.values(response.data.metric)
                                      .filter((value) => value.name === 'Min Temperature')
                                      .map((value) => Number(value.value)),
                                  historyTemperatureMaxNormal: generateNormal(
                                      Object.values(response.data.region_norm).filter((value) => value.name === 'Max Temperature'),
                                      Object.values(response.data.metric)
                                          .filter((value, index) => index % 2 === 0)
                                          .map((value) => value.date)
                                  ),
                                  historyTemperatureMinNormal: generateNormal(
                                      Object.values(response.data.region_norm).filter((value) => value.name === 'Min Temperature'),
                                      Object.values(response.data.metric)
                                          .filter((value, index) => index % 2 === 0)
                                          .map((value) => value.date)
                                  )
                              }
                            : {},
                        Object.values(response.data.metric)
                            .filter((value, index) => index % 2 === 0)
                            .map((value) => value.date)
                    )
                );
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Температура" />
            <MainCard title="Температура воздуха" subheader="Данные получены из API Fieldclimate">
                <LineChart
                    titleChart="Температура воздуха,°C"
                    chartRootName="chart1"
                    data={data}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                />
            </MainCard>
            <MainCard title="Накопление активных температур" subheader="Данные получены из API Fieldclimate">
                <LineChart
                    titleChart="Накопление активных температур"
                    chartRootName="chart2"
                    data={dataInc}
                    intervalTimeUnit="hour"
                    intervalCount={1}
                />
            </MainCard>
            <MainCard title="Исторические данные о температуре" subheader="Данные получены из API Robolife2">
                <LineChart
                    titleChart="Температура (внешние данные), °C"
                    chartRootName="chart3"
                    data={dataHistory}
                    intervalTimeUnit="day"
                    intervalCount={1}
                />
            </MainCard>
        </div>
    );
};

export default Temperature;
