import { inpatientTypes } from './actions'

const initialState = {
  admissions: [],
  admission: null,
  vitals: [],
  interventions: [],
  reviews: [],
  investigations: [],
  prescriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case inpatientTypes.GET_ADMISSIONS:
      return {
        ...state,
        admissions: action.payload,
      };

    case inpatientTypes.GET_ADMISSION:
      return {
        ...state,
        admission: action.payload,
      };

    case inpatientTypes.GET_INTERVENTIONS:
      return {
        ...state,
        interventions: action.payload,
      };

    case inpatientTypes.GET_VITALS:
      return {
        ...state,
        vitals: action.payload,
      };

    case inpatientTypes.GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case inpatientTypes.GET_INVESTIGATIONS:
      return {
        ...state,
        investigations: action.payload,
      };

    case inpatientTypes.GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };

    case inpatientTypes.SAVE_DISCHARGE:
      return {
        ...state,
      };


    default:
      return state;
  }
}