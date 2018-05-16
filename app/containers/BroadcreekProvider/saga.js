import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  connected,
  connectionError,
} from './actions';

import {
  CONNECT,
} from './constants';

import {
  makeSelectConfig,
} from './selectors';

export function* connectSaga() {
  const { url } = yield select(makeSelectConfig());
  try {
    // TODO actually connect to something
    yield call(request, url);
    yield put(connected());
  } catch (err) {
    yield put(connectionError(err));
  }
}

export default function* sagas() {
  yield takeLatest(CONNECT, connectSaga);
}
