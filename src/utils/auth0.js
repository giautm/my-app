import decode from 'jwt-decode';
import {
  Auth0Lock,
} from 'auth0-lock';

export const ID_TOKEN_KEY = 'id_token';
export const ACCESS_TOKEN_KEY = 'access_token';
export const PROFILE_KEY = 'profile';

if (!process.env.REACT_APP_AUTH0_CLIENT_ID || !process.env.REACT_APP_AUTH0_DOMAIN) {
  throw new Error('Please define `REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_DOMAIN` in your .env file');
}

export const CONTAINER_ID = 'CONTAINER_ID';

const lock = new Auth0Lock(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN, {
    container: CONTAINER_ID,
    auth: {
      params: {
        scope: 'openid offline_access nickname username'
      }
    },
  }
);


export const showLockAsync = () => new Promise((resolve, reject) => {
  lock.once('authenticated', resolve);
  lock.once('authorization_error', reject);
  lock.once('unrecoverable_error', reject);
  lock.show();
});


export function login(options) {
  lock.show(options);

  return {
    hide() {
      lock.hide();
    }
  }
}

export function logout() {
  clearIdToken();
  clearProfile();
}

export function fetchAsUser(input, init = {}) {
  const headers = init.headers || {};

  return fetch(input, {
    ...init,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getIdToken()}`,
      ...headers
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response);
    }
    return response;
  });
}


async function updateProfile(userId, newProfile) {
  try {
    const response = await fetchAsUser(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(newProfile)
    });

    const profile = await response.json();
    setProfile(profile);
  } catch (error) {
    return error;
  }
}

function setProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getProfile() {
  return JSON.parse(localStorage.getItem(PROFILE_KEY));
}

function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function isLoggedIn() {
  const idToken = getIdToken();
  return idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
