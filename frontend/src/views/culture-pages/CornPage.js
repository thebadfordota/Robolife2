import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addHours } from 'date-fns';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';
import ColumnChart from '../../ui-component/ColumnChart';
import MainCard from '../../ui-component/cards/MainCard';

const CornPage = () => {
    const [cultureList, setCultureList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartDataInc, setChartDataInc] = useState([]);
    const [tableDataInc, setTableDataInc] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const station = useSelector((state) => state.station);

    useEffect(() => {
        fieldClimateAPI
            .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), 'monthly')
            .then((response) => {
                setChartData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
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
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url + 'q/', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setCultureList(data);
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
