import { combineReducers } from 'redux';
import covidChart from '../CovidChart/Redux/CovidChart.reducer';
const combinedReducers = combineReducers({
  covidChart
});
export default combinedReducers;