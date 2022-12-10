import { subDays } from 'date-fns';

export const initialState = {
    dateFrom: subDays(new Date(), 1),
    dateTo: new Date(),
    freq: 'hourly'
};

const chartSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return { ...state, dateFrom: action.date[0], dateTo: action.date[1] };
        case 'SET_FREQ':
            return { ...state, freq: action.freq };
        default:
            return state;
    }
};

export default chartSettingsReducer;
