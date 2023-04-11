import React, { useEffect, useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Button, IconButton, Modal, Table } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import { format } from 'date-fns';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../../constants/Constants';

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, type = 'text', dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT' || rowData.status === 'ADD';
    if (type === 'date') {
        rowData[dataKey] = new Date(rowData[dataKey]);
    }
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    type={type}
                    style={{ position: 'absolute', left: 0, top: '5px', width: '90%' }}
                    defaultValue={type === 'date' ? format(rowData[dataKey], 'yyyy-MM-dd') : rowData[dataKey]}
                    onChange={(event) => {
                        onChange && onChange(rowData.id, dataKey, event.target.value);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">
                    {type === 'date' ? rowData[dataKey].toLocaleDateString() : rowData[dataKey]}
                </span>
            )}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onSave, onCancel, onEditState, onDelete, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px' }}>
            {rowData.status === 'EDIT' || rowData.status === 'ADD' ? (
                <>
                    <Button
                        appearance="link"
                        onClick={() => {
                            onCancel(rowData.id);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <Button
                        appearance="link"
                        onClick={() => {
                            onSave(rowData.id);
                        }}
                    >
                        <CheckIcon />
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        appearance="link"
                        onClick={() => {
                            onEditState(rowData.id);
                        }}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        appearance="link"
                        onClick={() => {
                            onDelete(rowData.id);
                        }}
                    >
                        <TrashIcon />
                    </Button>
                </>
            )}
        </Cell>
    );
};

const SettingsCulturePage = () => {
    const [deleteModal, setDeleteModal] = useState({ status: false, id: null });
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        axios
            .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url + 'q/', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
            .then(({ data }) => {
                setIsLoading(false);
                setData(data);
                setEditedData(data);
            });
    }, []);

    const handleClose = (ev) => {
        if (Boolean(ev.target.value)) {
            handleDelete(deleteModal.id);
        }
        setDeleteModal({ ...deleteModal, status: false });
    };

    const handleOpen = (id) => setDeleteModal({ status: true, id: id });

    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], editedData);
        nextData.find((item) => item.id === id)[key] = value;
    };

    const handleCancel = (id) => {
        const nextData = Object.assign([], data);
        const activeItem = nextData.find((item) => item.id === id);
        if (activeItem.status === 'ADD') {
            handleDelete(id);
        } else {
            activeItem.status = null;
            setEditedData(
                data.map((x) => {
                    return { ...x };
                })
            );
        }
    };

    const handleSave = (id) => {
        const nextData = Object.assign([], editedData);
        const activeItem = nextData.find((item) => item.id === id);
        setIsLoading(true);
        if (activeItem.status === 'EDIT') {
            activeItem.status = null;
            axios
                .put(
                    `${ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url}c/${id}/`,
                    {
                        name: activeItem.name,
                        label: activeItem.label,
                        max_permissible_precipitation_level: activeItem.max_permissible_precipitation_level,
                        min_permissible_precipitation_level: activeItem.min_permissible_precipitation_level,
                        vegetation_season_start: format(activeItem.vegetation_season_start, 'yyyy-MM-dd'),
                        vegetation_season_end: format(activeItem.vegetation_season_end, 'yyyy-MM-dd')
                    },
                    {
                        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                    }
                )
                .then(() => {
                    setIsLoading(false);
                    setData(nextData);
                });
        } else {
            activeItem.status = null;
            axios
                .post(
                    `${ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url}c/`,
                    {
                        name: activeItem.name,
                        label: activeItem.name,
                        max_permissible_precipitation_level: activeItem.max_permissible_precipitation_level,
                        min_permissible_precipitation_level: activeItem.min_permissible_precipitation_level,
                        vegetation_season_start: format(activeItem.vegetation_season_start, 'yyyy-MM-dd'),
                        vegetation_season_end: format(activeItem.vegetation_season_end, 'yyyy-MM-dd')
                    },
                    {
                        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                    }
                )
                .then(() => {
                    setIsLoading(false);
                    setData(nextData);
                });
        }
    };

    const handleEditState = (id) => {
        const nextData = Object.assign([], data);
        const activeItem = nextData.find((item) => item.id === id);
        activeItem.status = 'EDIT';
        setData(nextData);
    };

    const handleAdd = () => {
        const nextData = Object.assign([], data);
        const row = {
            id: nextData[nextData.length - 1].id + 1,
            name: '',
            min_permissible_precipitation_level: 0,
            max_permissible_precipitation_level: 0,
            vegetation_season_start: new Date().toLocaleDateString(),
            vegetation_season_end: new Date().toLocaleDateString(),
            status: 'ADD'
        };
        nextData.push(row);
        setData(nextData);

        const nextEditedData = Object.assign([], editedData);
        nextEditedData.push(row);
        setEditedData(nextData);
    };

    const handleDelete = (id) => {
        const nextData = Object.assign([], data);
        if (nextData.find((item) => item.id === id).status === 'ADD') {
            setData(nextData.filter((item) => item.id !== id));
        } else {
            axios
                .delete(`${ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.agriculture_url}c/${id}/`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
                .then(() => {
                    setData(nextData.filter((item) => item.id !== id));
                });
        }
    };

    return (
        <>
            <Modal style={{ zIndex: 10000 }} open={deleteModal.status} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Удалить</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы действительно хотите удалить {data?.find((item) => item.id === deleteModal.id)?.name || null}?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} value="true" appearance="primary">
                        Да
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
            <MainCard title="Культуры">
                <IconButton icon={<PlusIcon />} onClick={handleAdd}>
                    Добавить
                </IconButton>
                <Table height={420} data={data} loading={isLoading}>
                    <Column fullText width={100}>
                        <HeaderCell>Название</HeaderCell>
                        <EditableCell dataKey="name" onChange={handleChange} />
                    </Column>

                    <Column fullText width={200}>
                        <HeaderCell>Минимальное количество осадков</HeaderCell>
                        <EditableCell type="number" dataKey="min_permissible_precipitation_level" onChange={handleChange} />
                    </Column>

                    <Column fullText width={200}>
                        <HeaderCell>Максимальное количество осадков</HeaderCell>
                        <EditableCell type="number" dataKey="max_permissible_precipitation_level" onChange={handleChange} />
                    </Column>

                    <Column fullText width={200}>
                        <HeaderCell>Начало вегетационного периода</HeaderCell>
                        <EditableCell type="date" dataKey="vegetation_season_start" onChange={handleChange} />
                    </Column>

                    <Column fullText width={200}>
                        <HeaderCell>Конец вегетационного периода</HeaderCell>
                        <EditableCell type="date" dataKey="vegetation_season_end" onChange={handleChange} />
                    </Column>

                    <Column fullText flexGrow={1}>
                        <HeaderCell>...</HeaderCell>
                        <ActionCell
                            dataKey="id"
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onEditState={handleEditState}
                            onDelete={handleOpen}
                        />
                    </Column>
                </Table>
            </MainCard>
        </>
    );
};

export default SettingsCulturePage;
