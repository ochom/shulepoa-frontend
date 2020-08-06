import { pharmTypes } from './actions'

const initialState = {
  service_queue: [],
  patient_requests: [],
  pharm_selected_queue: null,
  reorder_history: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case pharmTypes.GET_PHARM_QUEUE:
      return {
        ...state,
        service_queue: action.payload,
      };

    case "PHARMACY_SELECT_QUEUE":
      return {
        ...state,
        pharm_selected_queue: action.payload,
      };


    case pharmTypes.GET_PATIENT_REQUESTS:
      return {
        ...state,
        patient_requests: action.payload,
      };


    case pharmTypes.ADD_DRUG_DISPENSE:
      return {
        ...state,
        patient_requests: [...state.patient_requests.filter(request => request.id !== action.payload.id)],
      };


    case pharmTypes.GET_PHARM_REORDER_HISTORY:
      return {
        ...state,
        reorder_history: action.payload,
      };

    default:
      return {
        ...state
      }
  }
}