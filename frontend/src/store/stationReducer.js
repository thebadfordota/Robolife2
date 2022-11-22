import config from '../config';

export const initialState = {
    stationId: '',
    stationName: ''
};

const stationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATION':
            return { ...state, stationId: action.stationId, stationName: action.stationName };
        default:
            return state;
    }
};

export default stationReducer;
