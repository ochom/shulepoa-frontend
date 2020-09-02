import { outpatientTypes } from './actions'

const initialState = {
  appointments: [],
  appointment: null,
  vitals: [],
  observations: [],
  investigations: [],
  diagnosis: [],
  prescriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case outpatientTypes.GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };

    case outpatientTypes.GET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
      };

    case outpatientTypes.GET_VITALS:
      return {
        ...state,
        vitals: action.payload,
      };

    case outpatientTypes.GET_OBSERVATIONS:
      return {
        ...state,
        observations: action.payload,
      };

    case outpatientTypes.GET_INVESTIGATIONS:
      return {
        ...state,
        investigations: action.payload,
      };

    case outpatientTypes.GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };

    case outpatientTypes.GET_DIAGNOSISS:
      return {
        ...state,
        diagnosis: action.payload,
      };

    case outpatientTypes.SAVE_DISCHARGE:
      return {
        ...state,
      };


    default:
      return state;
  }
}