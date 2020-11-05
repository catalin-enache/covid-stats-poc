
export const COVID_DATA_REQUEST = 'COVID_DATA_REQUEST';
export const COVID_DATA_SUCCESS = 'COVID_DATA_SUCCESS';
export const COVID_DATA_FAILURE = 'COVID_DATA_FAILURE';
export const SET_SELECTED_STATE = 'SET_SELECTED_STATE';
export const SET_SELECTED_INTERVAL = 'SET_SELECTED_INTERVAL';
export const SET_DRILL_DOWN_DATA = 'SET_DRILL_DOWN_DATA';

export const fetchCovidData = () => (dispatch) => {
  dispatch({
    type: COVID_DATA_REQUEST,
    payload: {
      processAs: 'text',
      fetchArgs: [
        // https://github.com/nytimes/covid-19-data
        // 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv',
        'https://raw.githubusercontent.com/catalin-enache/covid-stats-poc/master/public/covid_data.csv' // saved in own repo
        // './public/covid_data.csv' // does not work
      ]
    }
  });
};

export const setSelectedState = (selectedState) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_STATE,
    payload: selectedState
  });
};

export const setSelectedInterval = (selectedInterval) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_INTERVAL,
    payload: selectedInterval
  });
};

export const setDrillDownData = (selectedInterval) => (dispatch) => {
  dispatch({
    type: SET_DRILL_DOWN_DATA,
    payload: selectedInterval
  });
};