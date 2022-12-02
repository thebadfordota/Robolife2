import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// assets
import { Button, Modal, Placeholder, Input, FlexboxGrid } from 'rsuite';
import RecipeReviewCard from './Comment';

const ModalWindow = () => {
    const station = useSelector((state) => state.station);
    const titleModalWindow = station.id + ' • ' + station.name + ' • ' + station.deviceType;

    const modalParam = useSelector((state) => state.modalComments);
    const dispatch = useDispatch();

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
                <p>{'Тут параметр: ' + modalParam.value}</p>
            </Modal.Header>
            <Modal.Body style={divStyles}>
                <RecipeReviewCard></RecipeReviewCard>
                <RecipeReviewCard></RecipeReviewCard>
                <RecipeReviewCard></RecipeReviewCard>
                <RecipeReviewCard></RecipeReviewCard>
            </Modal.Body>
            <Modal.Footer style={{ marginTop: 10 }}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={18}>
                        <Input as="textarea" rows={3} placeholder="Комментарий" />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        <Button style={{ padding: 10 }} onClick={handleClose} appearance="primary">
                            Отправить
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;
