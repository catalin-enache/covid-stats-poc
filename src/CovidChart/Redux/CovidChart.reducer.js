import {
  COVID_DATA_REQUEST,
  COVID_DATA_SUCCESS,
  COVID_DATA_FAILURE
} from './CovidChart.actions';

import { parserCovidDataCSV } from '../CovidChart.helpers';

const defaultState = {
  covidData: null,
  errorRequest: null
};

const reducers = {
  [COVID_DATA_REQUEST]: (action, state) => {
    return {
      ...state,
      covidData: null,
      errorRequest: null
    };
  },
  [COVID_DATA_SUCCESS]: (action, state) => {
    const { payload } = action;
    return {
      ...state,
      covidData: parserCovidDataCSV(payload),
      errorRequest: null
    };
  },
  [COVID_DATA_FAILURE]: (action, state) => {
    const { payload } = action;
    return {
      ...state,
      covidData: null,
      errorRequest: payload
    };
  }
};

export default (state = defaultState, action) => {
  return reducers[action.type] ? reducers[action.type](action, state) : state;
}