import { radTypes } from './actions'

const initialState = {
  sampling_queue: [],
  results_queue: [],
  logbooks: [],
  selected_logbook: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case radTypes.GET_RAD_SAMPLING_QUEUE:
      return {
        ...state,
        sampling_queue: action.payload,
      };

    case radTypes.GET_RAD_RESULTS_QUEUE:
      return {
        ...state,
        results_queue: action.payload,
      };
    case radTypes.ADD_RAD_RESULT:
      return {
        ...state,
        results_queue: state.results_queue.filter(queue => queue.id !== action.payload.id),
      };

    case radTypes.GET_RAD_LOGBOOKS:
      return {
        ...state,
        logbooks: action.payload,
      };
    case 'SELECT_RAD_LOGBOOK':
      return {
        ...state,
        selected_logbook: action.payload,
      };

    default:
      return state;
  }
}