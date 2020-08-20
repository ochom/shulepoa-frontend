import { API_PATH, commonTypes } from '../common/actions'
import axios from 'axios';


export const authTypes = {
  USER_LOADING: 'USER_LOADING',
  USER_LOADED: 'USER_LOADED',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
}


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: authTypes.USER_LOADING });

  axios
    .get(`${API_PATH}auth/user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: authTypes.USER_LOADED, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, payload: "Authentication successful" })
    })
    .catch((err) => {
      dispatch({ type: authTypes.AUTH_ERROR, });
      // dispatch({ type: commonTypes.ERROR, payload: "Authentication failed" });
    });
};

// LOGIN USER
export const login = (data) => (dispatch) => {
  dispatch({ type: commonTypes.PROCESSING });
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`${API_PATH}auth/login/`, JSON.stringify(data), config)
    .then((res) => {
      dispatch({ type: authTypes.AUTH_SUCCESS, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, payload: "Login successful" })
    })
    .catch((err) => {
      dispatch({ type: authTypes.AUTH_ERROR });
      dispatch({ type: commonTypes.ERROR, payload: "Authentication failed, Organization not verified or invalid credentials" });
    }).finally(() => {
      dispatch({ type: commonTypes.DONE, });
    });
};


// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: authTypes.AUTH_ERROR,
  });
};


// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};