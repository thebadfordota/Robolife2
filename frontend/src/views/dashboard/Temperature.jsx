import React, { useEffect, useState } from 'react';
import Chart from '../../ui-component/Chart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { getChartData } from '../../utils/ChartUtils';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import { subMonths, subDays, subYears, isAfter } from 'date-fns';
import MainCard from '../../ui-component/cards/MainCard';
import { SelectPicker } from 'rsuite';
import { useSelector } from 'react-redux';

const Temperature = ({ station }) => {
    const [data, setData] = useState({ data: [], dates: [] });
    const [date, setDate] = useState([subDays(new Date(), 1), new Date()]);
    const [dataFreq, setDataFreq] = useState('hourly');
    const stationId = useSelector((state) => state.station.stationId);
    const stationName = useSelector((state) => state.station.stationName);
    console.log(stationId, stationName);

    const freqParams = {
        hourly: 'hour',
        daily: 'day',
        monthly: 'month'
    };

    const dataFreqAll = [
        {
            label: 'Ежечасно',
            value: 'hourly'
        },
        {
            label: 'Ежедневно',
            value: 'daily'
        },
        {
            label: 'Ежемесячно',
            value: 'monthly'
        }
    ];

    const ranges = [
        {
            label: 'Последние 7 дней',
            value: [subDays(new Date(), 7), new Date()]
        },
        {
            label: 'Последний месяц',
            value: [subMonths(new Date(), 1), new Date()]
        },
        {
            label: 'Последний год',
            value: [subYears(new Date(), 1), new Date()]
        }
    ];

    useEffect(() => {
        fieldClimateAPI.getForecast(station, Math.round(date[0] / 1000), Math.round(date[1] / 1000), dataFreq).then((response) => {
            setData(response);
        });
    }, [date, dataFreq]);

    let res = [];
    if (data.data.length) {
        res = getChartData(
            {
                averageTemperature: data.data[5].values.avg,
                minTemperature: data.data[5].values.min,
                maxTemperature: data.data[5].values.max
            },
            data.dates
        );
    }

    return (
        <div>
            <MainCard title="Температура">
                <DateRangePicker
                    size="lg"
                    value={date}
                    onChange={setDate}
                    ranges={ranges}
                    disabledDate={(date) => isAfter(date, new Date())}
                />
                <SelectPicker
                    size="lg"
                    data={dataFreqAll}
                    value={dataFreq}
                    onChange={setDataFreq}
                    searchable={false}
                    defaultValue={dataFreq}
                    placeholder="Выбрать частоту"
                />
            </MainCard>
            <MainCard>
                <Chart chartRootName="chart1" data={res} intervalTimeUnit={freqParams[dataFreq]} intervalCount={1} />
            </MainCard>
        </div>
    );
};

export default Temperature;
