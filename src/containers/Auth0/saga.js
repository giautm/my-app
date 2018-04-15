import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_LOCK } from './constants';
import {
  showLockAsync,
  fetchAsUser,
  ID_TOKEN_KEY,
  ACCESS_TOKEN_KEY,
} from 'utils/auth0';
import { loginSuccess } from './actions';

export function* showLock() {
  try {
    console.log('AAAA');
    const result = yield call(showLockAsync);

    localStorage.setItem(ID_TOKEN_KEY, result.accessToken);
    localStorage.setItem('@refresh_token', result.refreshToken);

    const user = yield call(fetchAsUser, `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`);
    console.log(yield user.json());
    yield put(loginSuccess(result));

    console.log('saga', result);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(SHOW_LOCK, showLock);
}
