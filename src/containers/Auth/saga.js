import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { FETCH_CURRENT_USER } from './constants';
import { userProfileLoaded, userProfileLoadingError } from './actions';
import { makeSelectAccessToken } from './selectors';

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

export function* getUserProfile() {
  let accessToken = yield select(makeSelectAccessToken());
  const requestURL = `https://${AUTH0_DOMAIN}/userinfo`;

  // const auth = {};
  // if (auth.isExpired()) {
  //   accessToken = yield call([auth, 'refreshTokenAsync']);
  //   yield put(accessTokenUpdated(accessToken));
  // }

  try {
    const profile = yield call(request, requestURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    yield put(userProfileLoaded(profile));
  } catch (err) {
    yield put(userProfileLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userProfile() {
  // Watches for FETCH_CURRENT_USER actions and calls getUserProfile when one
  // comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_CURRENT_USER, getUserProfile);
}
