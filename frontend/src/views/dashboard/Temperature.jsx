import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
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
            .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.weather_metrics_url + '?maxTemperature&minTemperature', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then((response) => {
                setDataHistory(
                    getChartData(
                        Object.values(response.data).length
                            ? {
                                  historyTemperatureMax: Object.values(response.data)
                                      .filter((value) => value.name === 'Max Temperature')
                                      .map((value) => Number(value.value)),
                                  historyTemperatureMin: Object.values(response.data)
                                      .filter((value) => value.name === 'Min Temperature')
                                      .map((value) => Number(value.value))
                              }
                            : {},
                        Object.values(response.data).map((value) => value.date)
                    )
                );
            });
    }, []);
    console.log(dataHistory);

    return (
        <div>
            <ChartMainCard title="Температура" />
            <SubCard>
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
            <SubCard title="Накопление активных температур">
                <Chart chartRootName="chart2" data={dataInc} intervalTimeUnit="hour" intervalCount={1} />
            </SubCard>
            <MainCard title="Исторические данные о температуре" subheader="Данные получены из API Robolife2">
                <Chart chartRootName="chart3" data={dataHistory} intervalTimeUnit="day" intervalCount={1} />
            </MainCard>
        </div>
    );
};

export default Temperature;
