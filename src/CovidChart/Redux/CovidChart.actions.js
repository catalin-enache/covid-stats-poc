
export const COVID_DATA_REQUEST = 'COVID_DATA_REQUEST';
export const COVID_DATA_SUCCESS = 'COVID_DATA_SUCCESS';
export const COVID_DATA_FAILURE = 'COVID_DATA_FAILURE';

export const fetchCovidData = () => (dispatch) => {
  dispatch({
    type: COVID_DATA_REQUEST,
    payload: {
      processAs: 'text',
      fetchArgs: [
        'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv'
      ]
    }
  });
};