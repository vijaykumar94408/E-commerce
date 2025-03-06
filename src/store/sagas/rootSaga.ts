import { all } from 'redux-saga/effects';
import { watchProductSaga } from './productSaga';

export default function* rootSaga() {
  yield all([
    watchProductSaga(),
  ]);
}
