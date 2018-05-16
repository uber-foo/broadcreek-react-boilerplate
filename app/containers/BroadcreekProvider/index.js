/*
 *
 * BroadcreekProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectConfig } from './selectors';

export class BroadcreekProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    log.debug('rendering broadcreek provider');
    return React.Children.only(this.props.children);
  }
}

BroadcreekProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectConfig(),
  (config) => ({ config })
);

export default connect(mapStateToProps)(BroadcreekProvider);
