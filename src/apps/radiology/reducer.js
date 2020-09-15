import { radTypes } from './actions'

const initialState = {
  logbooks: [],
  logbook: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case radTypes.GET_LOGBOOKS:
      return {
        ...state,
        logbooks: action.payload,
      };
    case radTypes.GET_LOGBOOK:
      return {
        ...state,
        logbook: action.payload,
      };

    default:
      return state;
  }
}