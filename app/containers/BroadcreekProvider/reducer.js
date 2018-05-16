/*
 *
 * BroadcreekProvider reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  STATE_NEVER_CONNECTED,
} from './constants';

import {
  DEFAULT_BROADCREEK_URL,
} from '../App/constants';

const initialState = fromJS({
  url: DEFAULT_BROADCREEK_URL,
  state: STATE_NEVER_CONNECTED,
});

function config(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  config,
});
