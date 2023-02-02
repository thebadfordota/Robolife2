import React, { useEffect, useState } from 'react';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData } from '../../utils/ChartUtils';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours, format } from 'date-fns';
import axios from 'axios';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';

const Precipitation = () => {
    const [chartData, setChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartDataInc, setChartDataInc] = useState([]);
    const [tableDataInc, setTableDataInc] = useState([]);
    const [chartDataHistory, setChartDataHistory] = useState([]);
    const [tableDataHistory, setTableDataHistory] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);

    const saveData = (editData) => {
        const data = editData
            .filter((obj) => obj.status === 'Edited')
            .map((obj) => {
                return { dt: format(obj.dateTime, 'yyyy-MM-dd HH:mm:ss'), c: 6, ch: 5, v: Number(obj.precipitation) };
            });
        fieldClimateAPI.setRainData(station.id, data).then(() => {
            fieldClimateAPI
                .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
                .then((response) => {
                    setChartData(
                        getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates)
                    );
                });
            fieldClimateAPI
                .getCalculationRain(station.id, 5, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000))
                .then((response) => {
                    setChartDataInc(
                        getChartData(
                            Object.values(response.chart).length
                                ? { increaseCountPrecipitation: Object.values(response.chart).map((value) => Number(value)) }
                                : {},
                            Object.keys(response.chart)
                        )
                    );
                });
        });
    };

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
            .then((response) => {
                setChartData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
                let tableData = [];
                response.dates.forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Number(Date.parse(value)),
                        precipitation: response.data[1].values.sum[index]
                    });
                });
                setTableData(tableData);
            });
        fieldClimateAPI
            .getCalculationRain(station.id, 5, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000))
            .then((response) => {
                setChartDataInc(
                    getChartData(
                        Object.values(response.chart).length
                            ? { increaseCountPrecipitation: Object.values(response.chart).map((value) => Number(value)) }
                            : {},
                        Object.keys(response.chart)
                    )
                );
                let tableData = [];
                Object.keys(response.chart).forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value),
                        increasePrecipitation: Object.values(response.chart).map((value) => Number(value))[index]
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
                    `?precipitationSum&startDate=${date[0].toISOString().split('T')[0]}&endDate=${date[1].toISOString().split('T')[0]}`,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            )
            .then((response) => {
                let normal = generateNormal(
                    Object.values(response.data.region_norm),
                    Object.values(response.data.metric).map((value) => value.date)
                );
                setChartDataHistory(
                    getChartData(
                        Object.values(response.data.metric).length
                            ? {
                                  precipitationSum: Object.values(response.data.metric).map((value) => Number(value.value)),
                                  precipitationSumNormal: normal,
                                  id: Object.values(response.data.metric).map((value) => value.id)
                              }
                            : {},
                        Object.values(response.data.metric).map((value) => value.date)
                    )
                );
                let tableData = [];
                Object.values(response.data.metric).forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value.date),
                        precipitationSum: Object.values(response.data.metric).map((value) => Number(value.value))[index],
                        precipitationSumNormal: normal[index]
                    });
                });
                setTableDataHistory(tableData);
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Осадки" />
            <MainCardChartAndTable
                title="Количество осадков"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableData}
                setTableData={setTableData}
                saveData={saveData}
                columnNames={[{ key: 'precipitation', name: 'Осадки (мм)' }]}
                freq={freq}
                chartData={chartData}
                editable={true}
                chartTitle="Осадки, mm"
                chartRootName="chart1"
            />
            <MainCardChartAndTable
                title="Нарастающее количество осадков"
                subheader="Данные получены из API Fieldclimate"
                tableData={tableDataInc}
                setTableData={setTableDataInc}
                chartTitle="Нарастающее количество осадков, mm"
                chartRootName="chart2"
                freq="hourly"
                chartData={chartDataInc}
                columnNames={[{ key: 'increasePrecipitation', name: 'Нарастающее количество осадков' }]}
            />
            <MainCardChartAndTable
                title="Исторические данные об осадках"
                subheader="Данные получены из API Robolife2"
                tableData={tableDataHistory}
                chartData={chartDataHistory}
                setTableData={setTableDataHistory}
                chartTitle="Осадки (внешние данные), mm"
                chartRootName="chart3"
                columnNames={[
                    { key: 'precipitationSum', name: 'Сумма осадков' },
                    {
                        key: 'precipitationSumNormal',
                        name: 'Норма суммы осадков'
                    }
                ]}
                freq="daily"
            />
        </div>
    );
};

export default Precipitation;
