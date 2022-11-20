import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';

const Precipitation = () => {
    const [data, setData] = useState({ data: [], dates: [] });

    useEffect(() => {
        fieldClimateAPI.getForecast().then((response) => {
            setData(response);
        });
    }, []);

    let res = [];
    if (data.data.length) {
        res = getChartData({ countPrecipitation: data.data[1].values.sum }, data.dates);
    }

    return (
        <div>
            <h1>Precipitation page works!</h1>
            <Chart chartRootName="chart1" data={res} intervalTimeUnit="day" intervalCount={1} />
        </div>
    );
};

export default Precipitation;
