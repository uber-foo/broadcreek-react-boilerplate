import { fromJS } from 'immutable';

import {
  selectBroadcreek,
} from '../selectors';

describe('selectBroadcreek', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      broadcreek: globalState,
    });
    expect(selectBroadcreek(mockedState)).toEqual(globalState);
  });
});
