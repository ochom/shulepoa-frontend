import { inpatientTypes } from './actions'

const initialState = {
  ward_list: [],
  selected_patient: null,
  inpatient_files: [],
  selected_health_file: null,
  interventions: [],
  reviews: [],
  investigations: [],
  prescriptions: [],
  chargeables: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SELECT_PATIENT_TO_ADMIT":
      return {
        ...state,
        selected_patient: action.payload,
      };

    case inpatientTypes.GET_ADMITED_PATIENT:
      return {
        ...state,
        inpatient_files: action.payload,
      };

    case "SELECT_INPATIENT_FILE":
      return {
        ...state,
        selected_health_file: action.payload,
      };


    case inpatientTypes.GET_INTERVENTIONS:
      return {
        ...state,
        interventions: action.payload,
      };

    case inpatientTypes.ADD_INTERVENTION:
      return {
        ...state,
        interventions: [...state.interventions, action.payload],
      };

    case inpatientTypes.UPDATE_INTERVENTION:
      return {
        ...state,
        interventions: [...state.interventions.filter(intervention => intervention.id !== action.payload.id), action.payload],
      };

    case inpatientTypes.DELETE_INTERVENTION:
      return {
        ...state,
        interventions: state.interventions.filter(intervention => intervention.id !== action.payload),
      };


    case inpatientTypes.GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case inpatientTypes.ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case inpatientTypes.UPDATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews.filter(review => review.id !== action.payload.id), action.payload],
      };

    case inpatientTypes.DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };


    case inpatientTypes.GET_IPD_INVESTIGATIONS:
      return {
        ...state,
        investigations: action.payload,
      };

    case inpatientTypes.ADD_IPD_INVESTIGATION:
      return {
        ...state,
        investigations: [...state.investigations, action.payload],
      };

    case inpatientTypes.DELETE_IPD_INVESTIGATION:
      return {
        ...state,
        investigations: state.investigations.filter(investigation => investigation.id !== action.payload),
      };


    case inpatientTypes.GET_IPD_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };

    case inpatientTypes.ADD_IPD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload],
      };

    case inpatientTypes.DELETE_IPD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.filter(prescription => prescription.id !== action.payload),
      };


    case inpatientTypes.GET_CHARGEABLES:
      return {
        ...state,
        chargeables: action.payload,
      };

    case inpatientTypes.ADD_CHARGEABLE:
      return {
        ...state,
        chargeables: [...state.chargeables, action.payload],
      };

    case inpatientTypes.DELETE_CHARGEABLE:
      return {
        ...state,
        chargeables: state.chargeables.filter(prescription => prescription.id !== action.payload),
      };


    case inpatientTypes.GET_WARDS:
      return {
        ...state,
        ward_list: action.payload,
      };
    case inpatientTypes.ADD_WARD:
      return {
        ...state,
        ward_list: [...state.ward_list, action.payload,],
      };
    case inpatientTypes.UPDATE_WARD:
      return {
        ...state,
        ward_list: [...state.ward_list.filter((ward) => ward.id !== action.payload.id), action.payload,],
      };
    case inpatientTypes.DELETE_WARD:
      return {
        ...state,
        ward_list: state.ward_list.filter((ward) => ward.id !== action.payload),
      };


    default:
      return state;
  }
}