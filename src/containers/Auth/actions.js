import {
  FETCH_CURRENT_USER,
  SET_ACCESS_TOKEN,
} from './constants';

export const fetchCurrentUser = () => ({
  type: FETCH_CURRENT_USER,
});

export const setAccessToken = (token) => ({
  type: SET_ACCESS_TOKEN,
  token,
});
