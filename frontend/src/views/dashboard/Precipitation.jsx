import React, { useEffect, useState } from 'react';
import LineChart from '../../ui-component/LineChart';
import fieldClimateAPI from '../../clients/FieldClimateClient';
import { generateNormal, getChartData } from '../../utils/ChartUtils';
import SubCard from '../../ui-component/cards/SubCard';
import { DATA_FREQUENCY_CONVERT, ROBOLIFE2_BACKEND_API } from '../../constants/Constants';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { Button, IconButton, Table } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import ChartMainCard from '../../ui-component/extended/ChartMainCard';
import { addHours } from 'date-fns';
import axios from 'axios';
import MainCard from '../../ui-component/cards/MainCard';
import ColumnChart from '../../ui-component/ColumnChart';
import SaveIcon from '@mui/icons-material/Save';

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    style={{ position: 'absolute', left: 0, top: '5px' }}
                    defaultValue={rowData[dataKey]}
                    onChange={(event) => {
                        onChange && onChange(rowData.id, dataKey, event.target.value);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick(rowData.id);
                }}
            >
                {rowData.status === 'EDIT' ? <SaveIcon fontSize="small" /> : <EditIcon />}
            </Button>
        </Cell>
    );
};

const Precipitation = () => {
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataInc, setDataInc] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);
    const date = useSelector((state) => [state.chartSettings.dateFrom, state.chartSettings.dateTo]);
    const freq = useSelector((state) => state.chartSettings.freq);
    const station = useSelector((state) => state.station);
    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], editData);
        nextData.find((item) => item.id === id)[key] = value;
        setEditData(nextData);
    };
    const handleEditState = (id) => {
        const nextData = Object.assign([], editData);
        const activeItem = nextData.find((item) => item.id === id);
        activeItem.status = activeItem.status === 'EDIT' ? 'Edited' : 'EDIT';
        setEditData(nextData);
    };

    const saveData = (editData) => {
        const data = editData
            .filter((obj) => obj.status === 'Edited')
            .map((obj) => {
                return { dt: obj.dateTime, c: 6, ch: 5, v: Number(obj.precipitation) };
            });
        fieldClimateAPI.setRainData(station.id, data).then(() => {
            fieldClimateAPI
                .getForecast(station.id, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000), freq)
                .then((response) => {
                    setData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
                });
            fieldClimateAPI
                .getCalculationRain(station.id, 5, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000))
                .then((response) => {
                    setDataInc(
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
                setData(getChartData(response.data.length ? { countPrecipitation: response.data[1].values.sum } : {}, response.dates));
                let editableData = [];
                response.dates.forEach((value, index) => {
                    editableData.push({ id: index, dateTime: value, precipitation: response.data[1].values.sum[index] });
                });
                setEditData(editableData);
            });
        fieldClimateAPI
            .getCalculationRain(station.id, 5, Math.round(addHours(date[0], 3) / 1000), Math.round(addHours(date[1], 3) / 1000))
            .then((response) => {
                setDataInc(
                    getChartData(
                        Object.values(response.chart).length
                            ? { increaseCountPrecipitation: Object.values(response.chart).map((value) => Number(value)) }
                            : {},
                        Object.keys(response.chart)
                    )
                );
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
                setDataHistory(
                    getChartData(
                        Object.values(response.data.metric).length
                            ? {
                                  precipitationSum: Object.values(response.data.metric).map((value) => Number(value.value)),
                                  precipitationSumNormal: generateNormal(
                                      Object.values(response.data.region_norm),
                                      Object.values(response.data.metric).map((value) => value.date)
                                  ),
                                  id: Object.values(response.data.metric).map((value) => value.id)
                              }
                            : {},
                        Object.values(response.data.metric).map((value) => value.date)
                    )
                );
            });
    }, [date[0], date[1]]);

    return (
        <div>
            <ChartMainCard title="????????????" />
            <MainCard title="???????????????????? ??????????????" subheader="???????????? ???????????????? ???? API Fieldclimate">
                <Grid container style={{ justifyContent: 'right' }}>
                    <Grid item>
                        {!editMode ? (
                            <IconButton icon={<EditIcon />} onClick={() => setEditMode(true)}>
                                ?????????????????????????? ????????????
                            </IconButton>
                        ) : (
                            <div>
                                <IconButton
                                    appearance="primary"
                                    color="cyan"
                                    style={{ marginRight: '10px' }}
                                    icon={<CloseIcon />}
                                    onClick={() => {
                                        setEditMode(false);
                                    }}
                                >
                                    ????????????????
                                </IconButton>
                                <IconButton
                                    icon={<CheckIcon />}
                                    appearance="primary"
                                    color="green"
                                    onClick={() => {
                                        setEditMode(false);
                                        saveData(editData);
                                    }}
                                >
                                    ??????????????????
                                </IconButton>
                            </div>
                        )}
                    </Grid>
                </Grid>
                {!editMode ? (
                    <LineChart
                        titleChart="????????????, mm"
                        chartRootName="chart1"
                        data={data}
                        intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                        intervalCount={1}
                    />
                ) : (
                    <Table height={420} data={editData}>
                        <Column width={200}>
                            <HeaderCell>???????? ?? ??????????</HeaderCell>
                            <Cell dataKey="dateTime" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>???????????? (????)</HeaderCell>
                            <EditableCell dataKey="precipitation" onChange={handleChange} />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>...</HeaderCell>
                            <ActionCell dataKey="id" onClick={handleEditState} />
                        </Column>
                    </Table>
                )}
            </MainCard>
            <MainCard title="?????????????????????? ???????????????????? ??????????????" subheader="???????????? ???????????????? ???? API Fieldclimate">
                <LineChart
                    titleChart="?????????????????????? ???????????????????? ??????????????, mm"
                    chartRootName="chart2"
                    data={dataInc}
                    intervalTimeUnit="hour"
                    intervalCount={1}
                />
            </MainCard>
            <MainCard title="???????????????????????? ???????????? ???? ??????????????" subheader="???????????? ???????????????? ???? API Robolife2">
                <LineChart
                    titleChart="???????????? (?????????????? ????????????), mm"
                    chartRootName="chart3"
                    data={dataHistory}
                    intervalTimeUnit="day"
                    intervalCount={1}
                    comments={true}
                />
            </MainCard>
        </div>
    );
};

export default Precipitation;
