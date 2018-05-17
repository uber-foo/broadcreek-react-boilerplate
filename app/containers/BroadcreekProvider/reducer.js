/*
 *
 * BroadcreekProvider reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  CONNECT,
  CONNECTED,
  CONNECTION_ERROR,
  DISCONNECT,
  DISCONNECTED,
  STATE_NEVER_CONNECTED,
  STATE_CONNECTING,
  STATE_CONNECTED,
  STATE_DISCONNECTING,
  STATE_DISCONNECTED,
} from './constants';

import {
  DEFAULT_BROADCREEK_URL,
} from '../App/constants';

const initialState = fromJS({
  url: DEFAULT_BROADCREEK_URL,
});

function config(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function status(state = STATE_NEVER_CONNECTED, action) {
  switch (action.type) {
    case CONNECT:
      return STATE_CONNECTING;
    case CONNECTED:
      return STATE_CONNECTED;
    case CONNECTION_ERROR:
      return STATE_DISCONNECTED;
    case DISCONNECT:
      return STATE_DISCONNECTING;
    case DISCONNECTED:
      return STATE_DISCONNECTED;
    default:
      return state;
  }
}

export default combineReducers({
  config,
  status,
});
