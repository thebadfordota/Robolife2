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

const SoilMoisture = () => {
    const [dataHistory, setDataHistory] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);

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
            .then((response) => {
                setDataHistory(
                    getChartData(
                        Object.values(response.data.soil_moisture_10cm).length
                            ? {
                                  soilMoisture10cm: Object.values(response.data.soil_moisture_10cm).map((value) => Number(value.value)),
                                  soilMoisture20cm: Object.values(response.data.soil_moisture_20cm).map((value) => Number(value.value)),
                                  soilMoisture100cm: Object.values(response.data.soil_moisture_100cm).map((value) => Number(value.value))
                              }
                            : {},
                        Object.values(response.data.soil_moisture_10cm).map((value) => value.date_and_time)
                    )
                );
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="Влажность почвы" />
            <MainCard title="Влажность почвы" subheader="Данные получены из API Fieldclimate">
                <LineChart
                    titleChart="Влажность почвы, m3/m3"
                    chartRootName="chart1"
                    data={dataHistory}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                />
            </MainCard>
        </div>
    );
};

export default SoilMoisture;
