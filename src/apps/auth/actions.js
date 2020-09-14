import { API_PATH, commonTypes } from '../common/actions'
import axios from 'axios';


export const authTypes = {
  USER_LOADING: 'USER_LOADING',
  USER_LOADED: 'USER_LOADED',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',

  PASSWORD_RESET_SENT: 'PASSWORD_RESET_SENT',
  PASSWORD_CHANGE_SUCCESS: 'PASSWORD_CHANGE_SUCCESS',
}


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: authTypes.USER_LOADING });
  axios
    .get(`${API_PATH}auth/user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: authTypes.USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: authTypes.AUTH_ERROR, });
    });
};


export const login = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING });
  axios
    .post(`${API_PATH}auth/login/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: authTypes.AUTH_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: authTypes.AUTH_ERROR });
      dispatch({ type: commonTypes.ERROR, payload: "Authentication failed, Organization not verified or invalid credentials" });
    }).finally(() => {
      dispatch({ type: commonTypes.DONE, });
    });
};


export const reset = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING });
  axios
    .post(`${API_PATH}rest-auth/password/reset/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch({ type: authTypes.PASSWORD_RESET_SENT })
      dispatch({ type: commonTypes.SUCCESS, payload: "Request received,\n Check your email inbox." });
    })
    .catch(() => {
      dispatch({ type: commonTypes.ERROR, payload: "Request to reset your password failed,\n Verify your email and try again." });
    }).finally(() => {
      dispatch({ type: commonTypes.DONE, });
    });
};


export const confirm_reset = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING });
  axios
    .post(`${API_PATH}rest-auth/password/reset/confirm/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch({ type: authTypes.PASSWORD_CHANGE_SUCCESS })
      dispatch({ type: commonTypes.SUCCESS, payload: "Password reset to new one." });
    })
    .catch(() => {
      dispatch({ type: commonTypes.ERROR, payload: "Password reset failed" });
    }).finally(() => {
      dispatch({ type: commonTypes.DONE, });
    });
};


export const logout = () => (dispatch, getState) => {
  dispatch({
    type: authTypes.AUTH_ERROR,
  });
};


// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
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