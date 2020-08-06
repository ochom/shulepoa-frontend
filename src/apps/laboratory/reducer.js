import { labTypes } from './actions'

const initialState = {
  sampling_queue: [],
  results_queue: [],
  verification_queue: [],
  logbooks: [],
  selected_logbook: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case labTypes.GET_LAB_SAMPLING_QUEUE:
      return {
        ...state,
        sampling_queue: action.payload,
      };

    case labTypes.GET_LAB_RESULTS_QUEUE:
      return {
        ...state,
        results_queue: action.payload,
      };
    case labTypes.ADD_LAB_RESULT:
      return {
        ...state,
        results_queue: state.results_queue.filter(queue => queue.id !== action.payload.id),
      };

    case labTypes.GET_LAB_VERIFICATION_QUEUE:
      return {
        ...state,
        verification_queue: action.payload,
      };
    case labTypes.ADD_LAB_VERIFICATION:
      return {
        ...state,
        verification_queue: state.verification_queue.filter(queue => queue.id !== action.payload.id),
      };


    case labTypes.GET_LAB_LOGBOOKS:
      return {
        ...state,
        logbooks: action.payload,
      };
    case 'SELECT_LOGBOOK':
      return {
        ...state,
        selected_logbook: action.payload,
      };

    default:
      return state;
  }
}