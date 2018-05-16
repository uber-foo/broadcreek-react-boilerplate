import { createSelector } from 'reselect';

/**
 * Direct selector to the broadcreek state domain
 */
const selectBroadcreek = (state) => state.get('broadcreek');

/**
 * Select broadcreek configuration
 */

const makeSelectConfig = () => createSelector(
  selectBroadcreek,
  (broadcreekState) => broadcreekState.get('config')
);

export {
  selectBroadcreek,
  makeSelectConfig,
};
