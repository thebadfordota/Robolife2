import config from '../config';

export const initialState = {
    id: '00001F76',
    name: '',
    deviceType: '',
    lastData: ''
};

const stationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATION':
            return { ...state, id: action.id, name: action.name, deviceType: action.deviceType, lastData: action.lastData };
        default:
            return state;
    }
};

export default stationReducer;
