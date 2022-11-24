import React from 'react';
import { SelectPicker } from 'rsuite';

const DataFrequencyPicker = ({ freq, setFreq }) => {
    const data = [
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

    return (
        <SelectPicker
            size="lg"
            data={data}
            value={freq}
            onChange={setFreq}
            searchable={false}
            defaultValue={freq}
            placeholder="Выбрать частоту"
        />
    );
};

export default DataFrequencyPicker;
