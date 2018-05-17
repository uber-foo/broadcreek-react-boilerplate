import { put, takeLatest } from 'redux-saga/effects';

import {
  connected,
  connectionError,
} from './actions';

import {
  CONNECT,
} from './constants';

export function* connectSaga({ broadcreek }) {
  const { log } = this;
  log.debug('running saga');
  try {
    yield broadcreek.connect();
    yield put(connected());
    log.debug('saga completed successfully');
  } catch (err) {
    log.error(err, 'saga failed');
    yield put(connectionError(err));
  }
}

export default function createSagaManager(logger) {
  return function* sagaManager() {
    yield takeLatest(CONNECT, connectSaga.bind({ log: logger.child({ component: 'connect-saga' }) }));
  };
}
