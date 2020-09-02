import { recordTypes } from './actions.js'

const initialState = {
  patients: [],
  patient: null,
  schemes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case recordTypes.GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };

    case recordTypes.GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };


    case recordTypes.GET_SCHEMES:
      return {
        ...state,
        schemes: action.payload,
      };

    default:
      return state;
  }
}