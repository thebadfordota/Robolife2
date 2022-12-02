import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import stationReducer from './stationReducer';
import modalCommentsReducer from './modalCommentsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    station: stationReducer,
    modalComments: modalCommentsReducer
});

export default reducer;
