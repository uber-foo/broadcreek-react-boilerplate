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

/**
 * Select broadcreek status
 */
const makeSelectStatus = () => createSelector(
  selectBroadcreek,
  (broadcreekState) => broadcreekState.get('status')
);

export {
  selectBroadcreek,
  makeSelectConfig,
  makeSelectStatus,
};
