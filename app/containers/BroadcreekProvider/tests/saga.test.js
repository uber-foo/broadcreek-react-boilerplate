/**
 * Tests for BroadcreekProvider sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { connected, connectionError } from '../actions';
import { CONNECT } from '../constants';
import sagas, { connectSaga } from '../saga';

const url = 'wss://localhost:25710';

/* eslint-disable redux-saga/yield-effects */
describe('Connect Saga', () => {
  let connectSagaGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    connectSagaGenerator = connectSaga();

    const selectDescriptor = connectSagaGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = connectSagaGenerator.next(url).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the connected action if it requests the data successfully', () => {
    const response = [{}];
    const putDescriptor = connectSagaGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(connected()));
  });

  it('should call the connectionError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = connectSagaGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(connectionError(response)));
  });
});

describe('BroadcreekProvider Saga Manager', () => {
  const sagaManager = sagas();

  it('should start task to watch for CONNECT action', () => {
    const takeLatestDescriptor = sagaManager.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(CONNECT, connectSaga));
  });
});
