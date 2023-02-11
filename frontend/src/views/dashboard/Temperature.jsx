import { useEffect, useState } from 'react';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData } from '../../utils/ChartUtils';
import { useSelector } from 'react-redux';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import axios from 'axios';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';

const Temperature = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartDataInc, setChartDataInc] = useState([]);
    const [tableDataInc, setTableDataInc] = useState([]);
    const [chartDataHistory, setChartDataHistory] = useState([]);
    const [tableDataHistory, setTableDataHistory] = useState([]);
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
                            ? {
                                  averageTemperature: response.data[5].values.avg,
                                  minTemperature: response.data[5].values.min,
                                  maxTemperature: response.data[5].values.max
                              }
                            : {},
                        response.dates
                    )
                );
                let tableData = [];
                response.dates.forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        averageTemperature: response.data[5].values.avg[index],
                        minTemperature: response.data[5].values.min[index],
                        maxTemperature: response.data[5].values.max[index]
                    });
                });
                setTableData(tableData);
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
            .then(({ chart }) => {
                setChartDataInc(
                    getChartData(
                        Object.values(chart).length
                            ? {
                                  degreesHours: Object.values(chart).map(({ degree_hours }) => Number(degree_hours)),
                                  degreesDays: Object.values(chart).map(({ degree_days }) => Number(degree_days)),
                                  degreesDaysUsa: Object.values(chart).map(({ degree_days_usa }) => Number(degree_days_usa))
                              }
                            : {},
                        Object.keys(chart)
                    )
                );
                let tableData = [];
                Object.keys(chart).forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        degreesHours: Object.values(chart).map(({ degree_hours }) => Number(degree_hours))[index],
                        degreesDays: Object.values(chart).map(({ degree_days }) => Number(degree_days))[index],
                        degreesDaysUsa: Object.values(chart).map(({ degree_days_usa }) => Number(degree_days_usa))[index]
                    });
                });
                setTableDataInc(tableData);
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
            .then(({ data }) => {
                let maxNormal = generateNormal(
                    data.region_norm.filter(({ name }) => name === 'Max Temperature'),
                    data.metrics.filter(({ name }) => name === 'Max Temperature').map(({ date }) => date)
                );
                let minNormal = generateNormal(
                    data.region_norm.filter(({ name }) => name === 'Min Temperature'),
                    data.metrics.filter(({ name }) => name === 'Min Temperature').map(({ date }) => date)
                );
                setChartDataHistory(
                    getChartData(
                        data.metrics.length
                            ? {
                                  historyTemperatureMax: data.metrics
                                      .filter(({ name }) => name === 'Max Temperature')
                                      .map(({ value }) => Number(value)),
                                  historyTemperatureMin: data.metrics
                                      .filter(({ name }) => name === 'Min Temperature')
                                      .map(({ value }) => Number(value)),
                                  historyTemperatureMaxNormal: maxNormal,
                                  historyTemperatureMinNormal: minNormal
                              }
                            : {},
                        data.metrics.filter(({ name }) => name === 'Max Temperature').map(({ date }) => date)
                    )
                );
                let tableData = [];
                data.metrics
                    .filter(({ name }) => name === 'Max Temperature')
                    .forEach((value, index) => {
                        tableData.push({
                            id: index,
                            dateTime: Date.parse(value.date),
                            historyTemperatureMax: data.metrics
                                .filter(({ name }) => name === 'Max Temperature')
                                .map(({ value }) => Number(value))[index],
                            historyTemperatureMin: data.metrics
                                .filter((value) => value.name === 'Min Temperature')
                                .map(({ value }) => Number(value))[index],
                            historyTemperatureMaxNormal: maxNormal[index],
                            historyTemperatureMinNormal: minNormal[index]
                        });
                    });
                setTableDataHistory(tableData);
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Температура" />
            <MainCardChartAndTable
                title="Температура воздуха"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableData}
                setTableData={setTableData}
                chartData={chartData}
                freq={freq}
                chartTitle="Температура воздуха,°C"
                chartRootName="chart1"
                columnNames={[
                    {
                        key: 'averageTemperature',
                        name: 'Средняя температура воздуха'
                    },
                    { key: 'minTemperature', name: 'Минимальная температура воздуха' },
                    { key: 'maxTemperature', name: 'Максимальная температура воздуха' }
                ]}
            />
            <MainCardChartAndTable
                title="Накопление активных температур"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableDataInc}
                setTableData={setTableDataInc}
                chartData={chartDataInc}
                freq="hourly"
                chartTitle="Накопление активных температур"
                chartRootName="chart2"
                columnNames={[
                    {
                        key: 'degreesHours',
                        name: 'Градусо-часы'
                    },
                    { key: 'degreesDays', name: 'Градусо-дни' },
                    { key: 'degreesDaysUsa', name: 'Градусо-дни (мин+макс)/2' }
                ]}
            />
            <MainCardChartAndTable
                title="Исторические данные о температуре"
                subheader="Данные получены из API Robolife2"
                tableData={tableDataHistory}
                setTableData={setTableDataHistory}
                chartData={chartDataHistory}
                freq="daily"
                chartTitle="Температура (внешние данные), °C"
                chartRootName="chart3"
                columnNames={[
                    { key: 'historyTemperatureMax', name: 'Максимальная температура воздуха' },
                    { key: 'historyTemperatureMin', name: 'Минимальная температура воздуха' },
                    { key: 'historyTemperatureMaxNormal', name: 'Норма максимальной температуры' },
                    { key: 'historyTemperatureMinNormal', name: 'Норма минимальной температуры' }
                ]}
            />
        </div>
    );
};

export default Temperature;
