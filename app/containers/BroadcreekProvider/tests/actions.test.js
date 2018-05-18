import {
  connect,
  connected,
  connectionError,
  connectionFailed,
  disconnect,
  disconnected,
} from '../actions';

import {
  CONNECT,
  CONNECTED,
  CONNECTION_ERROR,
  CONNECTION_FAILED,
  DISCONNECT,
  DISCONNECTED,
} from '../constants';

describe('BroadcreekProvider actions', () => {
  describe('Connect Action', () => {
    it('has a type of CONNECT', () => {
      const expected = {
        type: CONNECT,
        broadcreek: { answer: 42 },
      };
      expect(connect({ broadcreek: { answer: 42 } })).toEqual(expected);
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
        broadcreek: { answer: 42 },
      };
      expect(connectionError({ broadcreek: { answer: 42 } })).toEqual(expected);
    });
  });
  describe('Connection Failed Action', () => {
    it('has a type of CONNECTION_FAILED', () => {
      const expected = {
        type: CONNECTION_FAILED,
      };
      expect(connectionFailed()).toEqual(expected);
    });
  });
  describe('Disconnect Action', () => {
    it('has a type of DISCONNECT', () => {
      const expected = {
        type: DISCONNECT,
      };
      expect(disconnect()).toEqual(expected);
    });
  });
  describe('Disconnected Action', () => {
    it('has a type of DISCONNECTED', () => {
      const expected = {
        type: DISCONNECTED,
        broadcreek: { answer: 42 },
      };
      expect(disconnected({ broadcreek: { answer: 42 } })).toEqual(expected);
    });
  });
});
