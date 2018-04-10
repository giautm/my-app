/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';

import languageProviderReducer from '../containers/LanguageProvider/reducer';
import { routerReducer } from 'react-router-redux'
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 */

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    router: routerReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
