import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addHours, format } from 'date-fns';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData } from '../../utils/ChartUtils';
import axios from 'axios';
import { DATA_FREQUENCY_CONVERT, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';
import ColumnChart from '../../ui-component/ColumnChart';
import MainCard from '../../ui-component/cards/MainCard';
import LineChart from '../../ui-component/LineChart';

const CornPage = () => {
    const cultureList = [
        { name: 'corn', label: 'Кукуруза', min: 100, max: 200 },
        { name: 'beet', label: 'Сахарная свекла', min: 200, max: 300 },
        { name: 'sunflower', label: 'Подсолнечник', min: 300, max: 400 },
        { name: 'soy', label: 'Соя', min: 400, max: 500 },
        { name: 'wheat', label: 'Пшеница', min: 500, max: 600 }
    ];
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
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), 'monthly')
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
    }, [date[0], date[1], station.id]);

    return (
        <div>
            <ChartMainCard title="Культуры" settings />
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
                cultureList={cultureList}
            />

            <MainCard>
                <ColumnChart
                    titleChart="Количество осадков по месяцам"
                    chartRootName="prec"
                    data={chartData}
                    intervalTimeUnit="month"
                    intervalCount={1}
                />
            </MainCard>
        </div>
    );
};

export default CornPage;
