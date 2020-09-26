import { all } from 'redux-saga/effects';
import universalHTTPRequestSaga from "./universalHTTPRequestSaga";

export default function* rootSaga() {
  yield all([
    universalHTTPRequestSaga()
  ]);
}