/*
 *
 * LanguageProvider actions
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';

export function changeLocale(languageLocale) {
  log.info({ languageLocale }, 'changing locale');
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
