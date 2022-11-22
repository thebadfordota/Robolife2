import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import stationReducer from './stationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    station: stationReducer
});

export default reducer;
