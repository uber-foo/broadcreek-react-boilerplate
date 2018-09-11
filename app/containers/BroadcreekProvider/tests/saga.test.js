/**
 * Tests for BroadcreekProvider sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { connected, connectionError } from '../actions';
import { CONNECT } from '../constants';
import sagas, { connectSaga } from '../saga';

const fauxBroadcreek = { answer: 42 };

/* eslint-disable redux-saga/yield-effects */
describe('Connect Saga', () => {
  let connectSagaGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    connectSagaGenerator = connectSaga({ broadcreek: fauxBroadcreek });

    const selectDescriptor = connectSagaGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const connectDescriptor = connectSagaGenerator.next(0).value;
    expect(connectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the connected action if it connects successfully', () => {
    const putDescriptor = connectSagaGenerator.next().value;
    expect(putDescriptor).toEqual(put(connected()));
  });

  it('should call the connectionError action if the connection errors', () => {
    const response = new Error('Some error');
    const putDescriptor = connectSagaGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(connectionError({ broadcreek: fauxBroadcreek, attempt: 1 })));
  });
});

describe('BroadcreekProvider Saga Manager', () => {
  const sagaManager = sagas();

  it('should start task to watch for CONNECT action', () => {
    const takeLatestDescriptor = sagaManager.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(CONNECT, connectSaga));
  });
});
