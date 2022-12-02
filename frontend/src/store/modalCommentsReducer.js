import config from '../config';

export const initialState = {
    status: false,
    date: null,
    value: null
};

const modalCommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATE_MODAL':
            return { ...state, status: action.status, date: action.date, value: action.value };
        case 'RESET_STATE_MODAL':
            return { ...state, status: false };
        default:
            return state;
    }
};

export default modalCommentsReducer;
