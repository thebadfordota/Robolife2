import React, { useEffect, useState } from 'react';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData, getWindRoseData } from '../../utils/ChartUtils';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import WindRose from '../../ui-component/WindRose';
import axios from 'axios';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';

const Wind = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartDataHistory, setChartDataHistory] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setChartData(
                    getChartData(
                        response.data.length
                            ? { averageWindSpeed: response.data[2].values.avg, maxWindSpeed: response.data[2].values.max }
                            : {},
                        response.dates
                    )
                );
                let tableData = [];
                response.dates.forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        averageWindSpeed: response.data[2].values.avg[index],
                        maxWindSpeed: response.data[2].values.max[index]
                    });
                });
                setTableData(tableData);
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
                setChartDataHistory(
                    Object.values(response.data.metric).length
                        ? getWindRoseData(
                              Object.values(response.data.metric)
                                  .filter((value) => value.name === 'Max Wind Speed')
                                  .map((value) => Number(value.value)),
                              generateNormal(
                                  Object.values(response.data.region_norm).filter((value) => value.name === 'Max Wind Speed'),
                                  Object.values(response.data.metric).map((value) => value.date)
                              ).filter((value, index) => index % 2 === 0),
                              Object.values(response.data.metric)
                                  .filter((value) => value.name === 'Dominant Wind Direction')
                                  .map((value) => Number(value.value)),
                              generateNormal(
                                  Object.values(response.data.region_norm).filter((value) => value.name === 'Dominant Wind Direction'),
                                  Object.values(response.data.metric).map((value) => value.date)
                              ).filter((value, index) => index % 2 === 0)
                          )
                        : []
                );
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Ветер" />
            <MainCardChartAndTable
                title="Скорость ветра"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableData}
                setTableData={setTableData}
                chartData={chartData}
                freq={freq}
                chartTitle="Скорость ветра, м/с"
                chartRootName="chart1"
                columnNames={[
                    { key: 'averageWindSpeed', name: 'Средняя скорость ветра' },
                    {
                        key: 'maxWindSpeed',
                        name: 'Максимальная скорость ветра'
                    }
                ]}
            />
            <MainCard title="Исторические данные о ветре (роза ветров)" subheader="Данные получены из API Robolife2">
                <WindRose titleChart="Роза ветров" chartRootName="chart2" data={chartDataHistory} />
            </MainCard>
        </div>
    );
};

export default Wind;
