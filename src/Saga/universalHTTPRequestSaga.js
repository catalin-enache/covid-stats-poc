import { call, put, takeLatest } from 'redux-saga/effects';

const doFetch = ({ processAs, fetchArgs }) => () =>
  fetch(...fetchArgs)
    .then((response) => {
      if (response.status !== 200 ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response[processAs]();
    })
    .then((data) =>  ({ data }))
    .catch((err) => ({ err }));

function* request(action) {
  const { type, payload: { processAs, fetchArgs } } = action;
  const _type = type.replace('_REQUEST', '');

  try {
    const { data, err } = yield call(doFetch({ processAs, fetchArgs }));
    if (err) { throw err; }
    yield put({ type: `${_type}_SUCCESS`, payload: data });
  } catch (err) {
    yield put({ type: `${_type}_FAILURE`, payload: err });
  }
}

function* universalHTTPRequestSaga() {
  yield takeLatest((action) => (action.type.endsWith('_REQUEST')), request);
}

export default universalHTTPRequestSaga;