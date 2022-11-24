import config from '../config';

export const initialState = {
    id: '00001F76',
    name: 'Сервисный центр',
    deviceType: 'iMetos 1',
    lastData: '2022-02-12 13:00:00'
};

const stationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATION':
            return { ...state, id: action.id, name: action.name };
        default:
            return state;
    }
};

export default stationReducer;
