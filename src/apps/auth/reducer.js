import { authTypes } from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  reset_sent: false,
  password_changed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case authTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authTypes.USER_LOADED:
    case authTypes.AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        reset_sent: false,
        password_changed: false
      };
    case authTypes.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        reset_sent: false,
        password_changed: false
      };
    case authTypes.PASSWORD_RESET_SENT:
      return {
        ...state,
        reset_sent: true,
      };
    case authTypes.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        password_changed: true,
      };
    default:
      return state;
  }
}