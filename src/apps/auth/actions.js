import { API_PATH, commonTypes } from '../common/actions'
import axios from 'axios';

export const authTypes = {
  USER_LOADED: 'USER_LOADED',
  USER_LOADING: 'USER_LOADING',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: authTypes.USER_LOADING });

  axios
    .get(`${API_PATH}auth/user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: authTypes.USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (data) => (dispatch) => {
  dispatch({ type: commonTypes.PROCESSING, });
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`${API_PATH}auth/login/`, JSON.stringify(data), config)
    .then((res) => {
      dispatch({
        type: authTypes.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.LOGIN_FAIL,
      });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE, });
    });
};

// REGISTER USER
export const register = (data) => (dispatch) => {
  dispatch({ type: commonTypes.PROCESSING, });
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(`${API_PATH}auth/register/`, JSON.stringify(data), config)
    .then((res) => {
      dispatch({
        type: authTypes.REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.REGISTER_FAIL,
      });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
};


// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch({
    type: authTypes.LOGOUT_SUCCESS,
  });
};



// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
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