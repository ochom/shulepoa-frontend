import { revenueTypes } from './actions'

const initialState = {
  payment_queue: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case revenueTypes.GET_PAYMENT_QUEUE:
      return {
        ...state,
        payment_queue: action.payload,
      };
    case revenueTypes.MAKE_PAYMENTS:
      return {
        ...state,
        payment_queue: state.payment_queue.filter((queue) => queue.patient.id !== action.payload),
      };


    default:
      return state;
  }
}