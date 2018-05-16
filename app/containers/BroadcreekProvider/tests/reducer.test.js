import { fromJS } from 'immutable';

import { DEFAULT_BROADCREEK_URL } from 'containers/App/constants';

import broadcreekProviderReducer from '../reducer';

import {
  STATE_NEVER_CONNECTED,
} from '../constants';

describe('broadcreekProviderReducer', () => {
  it('returns the initial state', () => {
    expect(broadcreekProviderReducer(undefined, {})).toEqual(fromJS({
      config: {
        url: DEFAULT_BROADCREEK_URL,
        state: STATE_NEVER_CONNECTED,
      },
    }));
  });
});
