import {
  connect,
  connected,
  connectionError,
} from '../actions';

import {
  CONNECT,
  CONNECTED,
  CONNECTION_ERROR,
} from '../constants';

describe('BroadcreekProvider actions', () => {
  describe('Connect Action', () => {
    it('has a type of CONNECT', () => {
      const expected = {
        type: CONNECT,
      };
      expect(connect()).toEqual(expected);
    });
  });
  describe('Connected Action', () => {
    it('has a type of CONNECTED', () => {
      const expected = {
        type: CONNECTED,
      };
      expect(connected()).toEqual(expected);
    });
  });
  describe('Connection Error Action', () => {
    it('has a type of CONNECTION_ERROR', () => {
      const expected = {
        type: CONNECTION_ERROR,
      };
      expect(connectionError()).toEqual(expected);
    });
  });
});
