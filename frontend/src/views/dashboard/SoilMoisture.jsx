import React, { useEffect, useState } from 'react';
import { getChartData } from '../../utils/ChartUtils';
import { useSelector } from 'react-redux';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import axios from 'axios';
import MainCardChartAndTable from '../../ui-component/cards/MainCardChartAndTable';

const SoilMoisture = () => {
    const [chartDataHistory, setChartDataHistory] = useState([]);
    const [tableDataHistory, setTableDataHistory] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);

    useEffect(() => {
        axios
            .get(
                ROBOLIFE2_BACKEND_API.base_url +
                    ROBOLIFE2_BACKEND_API.soil_moisture_url +
                    `?startDate=${date[0].toISOString().split('T')[0]}&endDate=${date[1].toISOString().split('T')[0]}`,
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            )
            .then(({ data }) => {
                setChartDataHistory(
                    getChartData(
                        data.soil_moisture_10cm.length
                            ? {
                                  soilMoisture10cm: data.soil_moisture_10cm.map(({ value }) => Number(value)),
                                  soilMoisture20cm: data.soil_moisture_20cm.map(({ value }) => Number(value)),
                                  soilMoisture100cm: data.soil_moisture_100cm.map(({ value }) => Number(value))
                              }
                            : {},
                        Object.values(data.soil_moisture_10cm).map(({ date }) => date)
                    )
                );
                let tableData = [];
                data.soil_moisture_10cm.forEach((value, index) => {
                    tableData.push({
                        id: index,
                        dateTime: Date.parse(value.date),
                        soil_moisture_10cm: data.soil_moisture_10cm.map(({ value }) => Number(value))[index],
                        soil_moisture_20cm: data.soil_moisture_20cm.map(({ value }) => Number(value))[index],
                        soil_moisture_100cm: data.soil_moisture_100cm.map(({ value }) => Number(value))[index]
                    });
                });
                setTableDataHistory(tableData);
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Влажность почвы" />
            <MainCardChartAndTable
                title="Влажность почвы"
                subheader="Данные получены из API Robolife2"
                tableData={tableDataHistory}
                setTableData={setTableDataHistory}
                chartData={chartDataHistory}
                columnNames={[
                    {
                        key: 'soil_moisture_10cm',
                        name: 'Влажность почвы(h=10сm)'
                    },
                    { key: 'soil_moisture_20cm', name: 'Влажность почвы(h=20сm)' },
                    {
                        key: 'soil_moisture_100cm',
                        name: 'Влажность почвы(h=100сm)'
                    }
                ]}
                chartTitle="Влажность почвы, m3/m3"
                chartRootName="chart1"
                freq="daily"
            />
        </div>
    );
};

export default SoilMoisture;
