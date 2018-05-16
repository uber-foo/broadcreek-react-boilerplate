/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default function NotFound() {
  log.warn('rendering not found container');
  return (
    <article>
      <FormattedMessage {...messages.header} />
    </article>
  );
}
