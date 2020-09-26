import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../Saga/rootSaga";
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware)
);

export default function configureStore() {
  return store;
}

sagaMiddleware.run(rootSaga);