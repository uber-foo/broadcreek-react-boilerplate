import { put, select, takeLatest } from 'redux-saga/effects';

import {
  connect,
  connected,
  connectionError,
  connectionFailed,
} from './actions';

import {
  CONNECT,
  CONNECTION_ERROR,
  DISCONNECTED,
} from './constants';

import { makeSelectReconnectAttempt } from './selectors';

export function* connectSaga({ broadcreek }) {
  const { log } = this;
  const attempt = yield select(makeSelectReconnectAttempt());
  log.debug({ attempt }, 'running saga');
  try {
    yield broadcreek.connect();
    yield put(connected());
    log.debug('saga completed successfully');
  } catch (err) {
    log.error(err, 'saga failed');
    yield put(connectionError({ broadcreek, attempt: attempt + 1 }));
  }
}

export function* disconnectedSaga({ broadcreek, attempt }) {
  const { log } = this;
  const delayPerAttempt = 1000;
  const maxAttempts = MAXIMUM_BROADCREEK_RECONNECT_ATTEMPTS;
  log.debug({ delayPerAttempt, attempt, maxAttempts }, 'running saga');
  if (attempt > maxAttempts) {
    log.warn('maximum reconnect attempts reached');
    yield put(connectionFailed());
  } else {
    const delay = attempt * delayPerAttempt;
    log.info(`waiting ${delay}ms before reconnect on attempt ${attempt}`);
    yield new Promise((resolve) => setTimeout(() => resolve(), delay));
    yield put(connect({ broadcreek }));
  }
}

export default function createSagaManager(logger) {
  return function* sagaManager() {
    yield takeLatest(CONNECT, connectSaga.bind({ log: logger.child({ component: 'connect-saga' }) }));
    yield takeLatest(DISCONNECTED, disconnectedSaga.bind({ log: logger.child({ component: 'disconnected-saga' }) }));
    yield takeLatest(CONNECTION_ERROR, disconnectedSaga.bind({ log: logger.child({ component: 'disconnected-saga' }) }));
  };
}
