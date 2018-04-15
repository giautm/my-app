
import Immutable from 'immutable';

import {
  FETCH_CURRENT_USER,
  SET_ACCESS_TOKEN,
} from './constants';

const initCurrentUser = Immutable.Map({
  auth: {},
});

export const currentUser = (state = initCurrentUser, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return state;
    case SET_ACCESS_TOKEN:
      return state.setIn(['auth', 'token'], action.token);
    default:
      return state;
  }
}
