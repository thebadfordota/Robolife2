import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ButtonGroup, IconButton, SelectPicker } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';
import TableIcon from '@rsuite/icons/Table';
import CalendarIcon from '@rsuite/icons/Calendar';
import LineChartIcon from '@rsuite/icons/LineChart';
import LineChart from '../LineChart';
import { DATA_FREQUENCY_CONVERT } from '../../constants/Constants';
import DataTable from '../DataTable';
import MainCard from './MainCard';
import { useDispatch } from 'react-redux';
import { endOfDay, startOfDay } from 'date-fns';

const buttonColor = {
    color: 'blue'
};

const MainCardChartAndTable = ({
    title,
    subheader,
    tableData,
    setTableData,
    chartData,
    editable,
    saveData,
    freq,
    columnNames,
    chartTitle,
    chartRootName,
    comments,
    cultureList
}) => {
    const [editMode, setEditMode] = useState(false);
    const [tableMode, setTableMode] = useState(false);
    const [culture, setCulture] = useState(null);

    const dispatch = useDispatch();

    const handleVegetationPeriod = () => {
        if (culture)
            dispatch({
                type: 'SET_DATE',
                date: [
                    startOfDay(new Date(cultureList?.find((value) => value.name === culture).vegetation_season_start)),
                    endOfDay(new Date(cultureList?.find((value) => value.name === culture).vegetation_season_end))
                ]
            });
    };

    return (
        <MainCard title={title} subheader={subheader}>
            <Grid container spacing={2} justifyContent="flex-end">
                {cultureList ? (
                    <>
                        <Grid item>
                            <SelectPicker
                                locale={{ searchPlaceholder: 'Поиск', placeholder: 'Выберите культуру' }}
                                value={culture}
                                onChange={setCulture}
                                data={cultureList.map((val) => ({ label: val.name, value: val.name }))}
                                style={{ width: 224 }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton icon={<CalendarIcon />} onClick={handleVegetationPeriod} />
                        </Grid>
                    </>
                ) : null}
                {editable ? (
                    <Grid item>
                        {!editMode ? (
                            <IconButton icon={<EditIcon />} onClick={() => setEditMode(true)}>
                                Редактировать данные
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
                                    Отменить
                                </IconButton>
                                <IconButton
                                    icon={<CheckIcon />}
                                    appearance="primary"
                                    color="green"
                                    onClick={() => {
                                        setEditMode(false);
                                        saveData(tableData);
                                    }}
                                >
                                    Применить
                                </IconButton>
                            </div>
                        )}
                    </Grid>
                ) : null}
                <Grid item>
                    {!editMode ? (
                        <ButtonGroup>
                            <IconButton style={tableMode ? buttonColor : null} icon={<TableIcon />} onClick={() => setTableMode(true)} />
                            <IconButton
                                style={!tableMode ? buttonColor : null}
                                icon={<LineChartIcon />}
                                onClick={() => setTableMode(false)}
                            />
                        </ButtonGroup>
                    ) : (
                        <div />
                    )}
                </Grid>
            </Grid>
            {!editMode && !tableMode ? (
                <LineChart
                    titleChart={chartTitle}
                    chartRootName={chartRootName}
                    data={chartData}
                    intervalTimeUnit={DATA_FREQUENCY_CONVERT[freq]}
                    intervalCount={1}
                    comments={comments}
                    range={cultureList?.find((value) => value.name === culture)}
                />
            ) : (
                <DataTable tableData={tableData} setTableData={setTableData} editMode={editMode} columnNames={columnNames} />
            )}
        </MainCard>
    );
};

export default MainCardChartAndTable;
