import {
  SHOW_LOCK,
  LOGIN_SUCCESS,
} from './constants';

export const showLock = () => ({ type: SHOW_LOCK });

export const loginSuccess = (result) => ({
  type: LOGIN_SUCCESS,
  result,
})
