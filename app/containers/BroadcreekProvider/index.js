/*
 *
 * BroadcreekProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import BroadcreekClient from 'broadcreek-client';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  connect as connectToBroadcreek,
  disconnected as disconnectedFromBroadcreek,
} from './actions';
import {
  STATE_NEVER_CONNECTED,
  STATE_CONNECTING,
  STATE_CONNECTED,
  STATE_DISCONNECTING,
  STATE_DISCONNECTED,
} from './constants';
import reducer from './reducer';
import createSagaManager from './saga';
import {
  makeSelectStatus,
  makeSelectReconnectAttempt,
} from './selectors';

export class BroadcreekProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { log } = BroadcreekProvider;
    const { props: { reconnectAttempt: attempt } } = this;
    // initialize a new broadcreek client with our logger
    this.broadcreek = new BroadcreekClient({
      logger: log.child({ component: 'broadcreek-client' }),
    });
    this.broadcreek.on('error', (err) => {
      log.error(err, 'broadcreek client error');
    });
    this.broadcreek.on('disconnected', () => {
      const { props: { onDisconnected, status } } = this;
      if (status !== STATE_DISCONNECTING && status !== STATE_DISCONNECTED) {
        log.warn('broadcreek disconnected unexpetedly, reconnecting');
        onDisconnected({ broadcreek: this.broadcreek, attempt });
      }
    });
  }

  componentDidMount() {
    const { broadcreek, props: { onConnect } } = this;
    onConnect({ broadcreek });
  }

/*
  componentWillUpdate(nextProps) {
    const { broadcreek } = this;
    const { onConnect, status } = nextProps;
    switch (status) {
      case STATE_DISCONNECTED: {
        onConnect({ broadcreek });
        break;
      }
      default:
    }
  }
  */

  renderInitialConnection() {
    return (
      <div>
        Boostrapping...
      </div>
    );
  }

  renderConnecting() {
    return (
      <div>
        Connecting...
      </div>
    );
  }

  renderChildren() {
    return React.Children.only(this.props.children);
  }

  renderDisconnecting() {
    return (
      <div>
        Disconnecting...
      </div>
    );
  }

  renderDisconnected() {
    return (
      <div>
        Disconnected.
      </div>
    );
  }

  renderInvalidState() {
    return (
      <div>
        ERR: Invalid state.
      </div>
    );
  }

  renderReconnecting() {
    return (
      <div>
        Reconnecting...
      </div>
    );
  }

  renderMaximumReconnect() {
    return (
      <div>
        Maximum reconnect attempts reached. :(
      </div>
    );
  }

  render() {
    const { log } = BroadcreekProvider;
    const { props: { reconnectAttempt, status } } = this;
    if (reconnectAttempt > 0) {
      if (reconnectAttempt > MAXIMUM_BROADCREEK_RECONNECT_ATTEMPTS) {
        return this.renderMaximumReconnect();
      }
      return this.renderReconnecting();
    }
    log.debug('rendering broadcreek provider');
    switch (status) {
      case STATE_NEVER_CONNECTED: return this.renderInitialConnection();
      case STATE_CONNECTING: return this.renderConnecting();
      case STATE_CONNECTED: return this.renderChildren();
      case STATE_DISCONNECTING: return this.renderDisconnecting();
      case STATE_DISCONNECTED: return this.renderDisconnected();
      default: return this.renderInvalidState();
    }
  }
}

BroadcreekProvider.log = log.child({ component: 'broadcreek-provider' });

BroadcreekProvider.propTypes = {
  children: PropTypes.element.isRequired,
  status: PropTypes.oneOf([
    STATE_NEVER_CONNECTED,
    STATE_CONNECTING,
    STATE_CONNECTED,
    STATE_DISCONNECTING,
    STATE_DISCONNECTED,
  ]).isRequired,
  reconnectAttempt: PropTypes.number.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnected: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onConnect: (params) => dispatch(connectToBroadcreek(params)),
    onDisconnected: (params) => dispatch(disconnectedFromBroadcreek(params)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  reconnectAttempt: makeSelectReconnectAttempt(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'broadcreek', reducer });
const withSaga = injectSaga({ key: 'broadcreek', saga: createSagaManager(BroadcreekProvider.log) });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BroadcreekProvider);
