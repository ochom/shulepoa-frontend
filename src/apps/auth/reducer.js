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
    case authTypes.AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case authTypes.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}