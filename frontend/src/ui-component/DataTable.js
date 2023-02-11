import React, { useState } from 'react';
import { Button, Table } from 'rsuite';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@rsuite/icons/Edit';

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    style={{ position: 'absolute', left: 0, top: '5px', width: '90%' }}
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

const DataTable = ({ tableData, setTableData, editMode = false, columnNames }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], tableData);
        nextData.find((item) => item.id === id)[key] = value;
        setTableData(nextData);
    };
    const handleEditState = (id) => {
        const nextData = Object.assign([], tableData);
        const activeItem = nextData.find((item) => item.id === id);
        activeItem.status = activeItem.status === 'EDIT' ? 'Edited' : 'EDIT';
        setTableData(nextData);
    };

    const getData = () => {
        if (sortColumn && sortType) {
            return tableData
                .sort((a, b) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];
                    if (typeof x === 'string') {
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                })
                .map((value) => {
                    return { ...value, dateTime: new Date(value.dateTime).toLocaleString() };
                });
        }
        return tableData.map((value) => {
            return { ...value, dateTime: new Date(value.dateTime).toLocaleString() };
        });
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    return (
        <Table
            height={420}
            data={getData()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={!tableData.length}
        >
            <Column sortable fullText width={200}>
                <HeaderCell>Дата и время</HeaderCell>
                <Cell dataKey="dateTime" />
            </Column>
            {columnNames.map(({ name, key }) => (
                <Column sortable fullText width={200} key={key}>
                    <HeaderCell>{name}</HeaderCell>
                    {editMode ? <EditableCell sortable dataKey={key} onChange={handleChange} /> : <Cell dataKey={key} />}
                </Column>
            ))}
            {editMode ? (
                <Column sortable flexGrow={1}>
                    <HeaderCell>...</HeaderCell>
                    <ActionCell dataKey="id" onClick={handleEditState} />
                </Column>
            ) : null}
        </Table>
    );
};

export default DataTable;
