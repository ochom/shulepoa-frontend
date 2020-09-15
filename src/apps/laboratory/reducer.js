import { labTypes } from './actions'

const initialState = {
  logbooks: [],
  logbook: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case labTypes.GET_LOGBOOKS:
      return {
        ...state,
        logbooks: action.payload,
      };
    case labTypes.GET_LOGBOOK:
      return {
        ...state,
        logbook: action.payload,
      };

    default:
      return state;
  }
}