import { authTypes } from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case authTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case authTypes.LOGIN_SUCCESS:
    case authTypes.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case authTypes.AUTH_ERROR:
    case authTypes.LOGIN_FAIL:
    case authTypes.LOGOUT_SUCCESS:
    case authTypes.REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}