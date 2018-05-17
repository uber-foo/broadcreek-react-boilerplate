/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

// Import project name and version
import {
  name as PROJECT_NAME,
  version as PROJECT_VERSION,
} from '../package.json';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Configure global logger
global.LOG_LEVEL = {
  FATAL: {
    label: 'FATAL',
    value: 60,
    console: console.error, // eslint-disable-line no-console
  },
  ERROR: {
    label: 'ERROR',
    value: 50,
    console: console.error, // eslint-disable-line no-console
  },
  WARN: {
    label: 'WARN',
    value: 40,
    console: console.error, // eslint-disable-line no-console
  },
  INFO: {
    label: 'INFO',
    value: 30,
    console: console.log, // eslint-disable-line no-console
  },
  DEBUG: {
    label: 'DEBUG',
    value: 20,
    console: console.log, // eslint-disable-line no-console
  },
  TRACE: {
    label: 'TRACE',
    value: 10,
    console: console.log, // eslint-disable-line no-console
  },
};

global.CURRENT_LOG_LEVEL = LOG_LEVEL.TRACE;

function createLogger(level, component) {
  return function log(a, b) {
    // capture timestamp for when log message is serialized
    const occured = new Date();
    // if first property is an error, we have an explicit error to log
    const err = a instanceof Error ? a : null;
    // if second property is provided, first property is an object to log
    const obj = b != null ? a : null;
    // message is first property, unless err or obj were detected
    const msg = err || obj ? b : a;
    // serialize the log message, very similar to bunyan log format
    const payload = {
      // name of the project that generated the log message
      name: PROJECT_NAME,
      // version of the code that was running at the time
      version: PROJECT_VERSION,
      // hostname where the code was accessed from
      hostname: window.location.hostname,
      // http request info
      req: {
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        origin: window.location.origin,
        username: window.location.username,
        protocol: window.location.protocol,
        port: window.location.port,
      },
      // log level value
      level: level.value,
      // explicit log message
      msg,
      // time that the log event occured
      time: occured,
      // logger output version -- reserved for future use
      v: 0,
    };
    // output log message to console if at or above current threshold
    if (CURRENT_LOG_LEVEL.value <= level.value) {
      level.console(`${payload.time.toJSON()} ${(`     ${level.label}`).slice(-5)} [${component}]: ${payload.msg}`);
      if (err) console.error(err); // eslint-disable-line no-console
      else if (obj) console.dir(obj); // eslint-disable-line no-console
    }
    // TODO dispatch log message to remote logging server
  };
}
global.log = {
  fatal: createLogger(LOG_LEVEL.FATAL, 'root'),
  error: createLogger(LOG_LEVEL.ERROR, 'root'),
  warn: createLogger(LOG_LEVEL.WARN, 'root'),
  info: createLogger(LOG_LEVEL.INFO, 'root'),
  debug: createLogger(LOG_LEVEL.DEBUG, 'root'),
  trace: createLogger(LOG_LEVEL.TRACE, 'root'),
};
global.log.child = ({ component: childComponent }) => ({
  fatal: createLogger(LOG_LEVEL.FATAL, childComponent),
  error: createLogger(LOG_LEVEL.ERROR, childComponent),
  warn: createLogger(LOG_LEVEL.WARN, childComponent),
  info: createLogger(LOG_LEVEL.INFO, childComponent),
  debug: createLogger(LOG_LEVEL.DEBUG, childComponent),
  trace: createLogger(LOG_LEVEL.TRACE, childComponent),
  child: ({ component: childComponentInner }) => ({
    fatal: createLogger(LOG_LEVEL.FATAL, `${childComponent}/${childComponentInner}`),
    error: createLogger(LOG_LEVEL.ERROR, `${childComponent}/${childComponentInner}`),
    warn: createLogger(LOG_LEVEL.WARN, `${childComponent}/${childComponentInner}`),
    info: createLogger(LOG_LEVEL.INFO, `${childComponent}/${childComponentInner}`),
    debug: createLogger(LOG_LEVEL.DEBUG, `${childComponent}/${childComponentInner}`),
    trace: createLogger(LOG_LEVEL.TRACE, `${childComponent}/${childComponentInner}`),
  }),
});

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  log.debug('open sans font loaded');
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  log.debug('rendering react dom');
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  log.debug('using hot reloadable components');
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  log.debug('polyfilling for absent intl support');
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  log.debug('using native intl support');
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  log.debug('installing offline plugin runtime');
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
