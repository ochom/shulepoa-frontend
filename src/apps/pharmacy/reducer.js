import { pharmTypes } from './actions'

const initialState = {
  drugs: [],
  reorders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case pharmTypes.GET_DRUGS:
      return {
        ...state,
        drugs: action.payload,
      };

    case pharmTypes.GET_REORDERS:
      return {
        ...state,
        reorders: action.payload,
      };

    default:
      return {
        ...state
      }
  }
}