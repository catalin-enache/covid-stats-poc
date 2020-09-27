import {
  COVID_DATA_REQUEST,
  COVID_DATA_SUCCESS,
  COVID_DATA_FAILURE,
  SET_SELECTED_STATE,
  SET_SELECTED_INTERVAL,
  SET_DRILL_DOWN_DATA
} from './CovidChart.actions';

import { parserCovidDataCSV, getDrillDownData } from '../CovidChart.helpers';
import { INTERVALS, ALL_STATES } from '../CovidChart.constants';

const defaultState = {
  covidData: null,
  states: null,
  errorRequest: null,
  selectedState: { value: ALL_STATES, label: ALL_STATES },
  defaultSelectedState: { value: ALL_STATES, label: ALL_STATES },
  selectedInterval: { value: INTERVALS.BY_MONTHS, label: INTERVALS.BY_MONTHS },
  drillDownData: null
};

const reducers = {
  [COVID_DATA_REQUEST]: (action, state) => {
    return {
      ...state,
      covidData: null,
      states: null,
      errorRequest: null
    };
  },
  [COVID_DATA_SUCCESS]: (action, state) => {
    const { payload } = action;
    const [covidData, states] = parserCovidDataCSV(payload);
    return {
      ...state,
      covidData,
      states
    };
  },
  [COVID_DATA_FAILURE]: (action, state) => {
    const { payload } = action;
    return {
      ...state,
      errorRequest: payload
    };
  },
  [SET_SELECTED_STATE]: (action, state) => {
    const { payload } = action;
    return {
      ...state,
      selectedState: payload,
      drillDownData: null
    };
  },
  [SET_SELECTED_INTERVAL]: (action, state) => {
    const { payload } = action;
    return {
      ...state,
      selectedInterval: payload,
      drillDownData: null
    };
  },
  [SET_DRILL_DOWN_DATA]: (action, state) => {
    const { payload } = action;
    if (!payload) {
      return {
        ...state,
        drillDownData: null
      };
    }
    return {
      ...state,
      drillDownData: getDrillDownData(state.covidData, payload)
    };
  }
};

export default (state = defaultState, action) => {
  return reducers[action.type] ? reducers[action.type](action, state) : state;
}