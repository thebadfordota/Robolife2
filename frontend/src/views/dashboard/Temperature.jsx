import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import { useSelector } from 'react-redux';
import SubCard from '../../ui-component/cards/SubCard';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';

const Temperature = () => {
    const [data, setData] = useState({});
    const [dataInc, setDataInc] = useState({});
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

    return (
        <div>
            <ChartMainCard title="Температура" />
            <SubCard>
                <Chart chartRootName="chart1" data={data} intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]} intervalCount={1} />
            </SubCard>
            <SubCard>
                <Chart chartRootName="chart2" data={dataInc} intervalTimeUnit="hour" intervalCount={1} />
            </SubCard>
        </div>
    );
};

export default Temperature;
