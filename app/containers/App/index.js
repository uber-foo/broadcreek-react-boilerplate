/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import BroadcreekProvider from 'containers/BroadcreekProvider/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export default function App() {
  log.debug('rendering application container');
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Broadcreek React.js Boilerplate"
        defaultTitle="Broadcreek React.js Boilerplate"
      >
        <meta name="description" content="A Broadcreek React.js Boilerplate application" />
      </Helmet>
      <BroadcreekProvider>
        <Switch>
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BroadcreekProvider>
    </AppWrapper>
  );
}
