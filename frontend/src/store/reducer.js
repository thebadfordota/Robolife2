import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import stationReducer from './stationReducer';
import chartSettingsReducer from './chartSettingsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    station: stationReducer,
    chartSettings: chartSettingsReducer
});

export default reducer;
