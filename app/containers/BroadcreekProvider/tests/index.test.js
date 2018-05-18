import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import nullLogger from 'null-logger-light';

import configureStore from '../../../configureStore';

import ConnectedBroadcreekProvider, { BroadcreekProvider } from '../index';

describe('<BroadcreekProvider />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <BroadcreekProvider>
        {children}
      </BroadcreekProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<ConnectedBroadcreekProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
    global.log = nullLogger;
  });


  // TODO this is a temporary coverage hack, we should test functionality here
  // when we implement the provider

  it('should render its children when connected', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedBroadcreekProvider>
          <div>42</div>
        </ConnectedBroadcreekProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<div>42</div>)).toBe(true);
  });
});
