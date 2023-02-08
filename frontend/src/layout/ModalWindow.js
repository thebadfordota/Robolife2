import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// assets
import { Button, Modal, Input, FlexboxGrid } from 'rsuite';
import RecipeReviewCard from './Comment';
import axios from 'axios';
import { ROBOLIFE2_BACKEND_API } from '../constants/Constants';

const ModalWindow = () => {
    const [comments, setComments] = useState([]);
    const titleModalWindow = 'API Robolife2';
    const [input, setInput] = useState('');

    const modalParam = useSelector((state) => state.modalComments);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalParam.id) {
            axios
                .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.comments_url + `q/?metricId=${modalParam.id}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                })
                .then(({ data }) => {
                    setComments(data);
                });
        }
    }, [modalParam.id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.comments_url + 'c/',
                {
                    message: input,
                    user: localStorage.getItem('id'),
                    weather_metric: modalParam.id
                },
                {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                }
            )
            .then(() => {
                setInput('');
                axios
                    .get(ROBOLIFE2_BACKEND_API.base_url + ROBOLIFE2_BACKEND_API.comments_url + `q/?metricId=${modalParam.id}`, {
                        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                    })
                    .then(({ data }) => {
                        setComments(data);
                    });
            });
    };
    const handleClose = () => {
        dispatch({
            type: 'RESET_STATE_MODAL'
        });
    };

    const divStyles = {
        boxShadow: '1px 2px 7px rgb(225, 215, 215)',
        shadowOpacity: 0.2,
        padding: 10
    };
    return (
        <Modal style={{ zIndex: 1300 }} overflow={true} open={modalParam.status} onClose={handleClose}>
            <Modal.Header>
                <p>{titleModalWindow}</p>
                <p>{'Дата: ' + new Date(modalParam.date).toLocaleString()}</p>
                <p>{`${modalParam.typeParam}: ${modalParam.value} мм`}</p>
            </Modal.Header>
            {comments.length ? (
                <Modal.Body style={divStyles}>
                    {comments.map((value, index) => {
                        return <RecipeReviewCard key={index} data={value} />;
                    })}
                </Modal.Body>
            ) : (
                <div></div>
            )}

            <Modal.Footer style={{ marginTop: 10 }}>
                <form>
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={18}>
                            <Input as="textarea" rows={3} placeholder="Комментарий" onChange={(e) => setInput(e)} value={input} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={5}>
                            <Button type="submit" style={{ padding: 10 }} onClick={handleSubmit} appearance="primary">
                                Отправить
                            </Button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </form>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;
