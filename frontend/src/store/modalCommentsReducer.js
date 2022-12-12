import config from '../config';

export const initialState = {
    id: null,
    status: false,
    typeParam: null,
    date: null,
    value: null
};

const modalCommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATE_MODAL':
            return {
                ...state,
                status: action.status,
                date: action.date,
                value: action.value,
                id: action.id,
                typeParam: action.typeParam
            };
        case 'RESET_STATE_MODAL':
            return { ...state, status: false };
        default:
            return state;
    }
};

export default modalCommentsReducer;
