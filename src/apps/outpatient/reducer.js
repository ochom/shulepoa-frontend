import { outpatientTypes } from './actions'

const initialState = {
  triage_queue: [],
  appointment_queue: [],
  selected_health_file: null,
  observations: [],
  investigations: [],
  diagnosis: [],
  prescriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case outpatientTypes.GET_TRIAGE_QUEUE:
      return {
        ...state,
        triage_queue: action.payload,
      };
    case outpatientTypes.ADD_VITALS:
      return {
        ...state,
        triage_queue: state.triage_queue.filter((queue) => queue.id !== action.payload),
      };


    case outpatientTypes.GET_APPOINTMENT_QUEUE:
      return {
        ...state,
        appointment_queue: action.payload,
      };

    case "SELECT_HEALTH_FILE":
      return {
        ...state,
        selected_health_file: action.payload,
      };


    case outpatientTypes.GET_OBSERVATIONS:
      return {
        ...state,
        observations: action.payload,
      };

    case outpatientTypes.ADD_OBSERVATION:
      return {
        ...state,
        observations: [...state.observations, action.payload],
      };

    case outpatientTypes.UPDATE_OBSERVATION:
      return {
        ...state,
        observations: [...state.observations.filter(observation => observation.id !== action.payload.id), action.payload],
      };

    case outpatientTypes.DELETE_OBSERVATION:
      return {
        ...state,
        observations: state.observations.filter(observation => observation.id !== action.payload),
      };


    case outpatientTypes.GET_INVESTIGATIONS:
      return {
        ...state,
        investigations: action.payload,
      };

    case outpatientTypes.ADD_INVESTIGATION:
      return {
        ...state,
        investigations: [...state.investigations, action.payload],
      };

    case outpatientTypes.UPDATE_INVESTIGATION:
      return {
        ...state,
        investigations: [...state.investigations.filter(investigation => investigation.id !== action.payload.id), action.payload],
      };

    case outpatientTypes.DELETE_INVESTIGATION:
      return {
        ...state,
        investigations: state.investigations.filter(investigation => investigation.id !== action.payload),
      };


    case outpatientTypes.GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };

    case outpatientTypes.ADD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload],
      };

    case outpatientTypes.UPDATE_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [...state.prescriptions.filter(prescription => prescription.id !== action.payload.id), action.payload],
      };

    case outpatientTypes.DELETE_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.filter(prescription => prescription.id !== action.payload),
      };


    case outpatientTypes.SAVE_DISCHARGE:
      return {
        ...state,
        // selected_health_file: state.selected_health_file.discharge_note = action.payload,
      };


    default:
      return state;
  }
}