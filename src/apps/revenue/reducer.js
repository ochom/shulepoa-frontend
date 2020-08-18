import { revenueTypes } from './actions'

const initialState = {
  payment_queue: [],
  opd_ser_reqs: []
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


    case revenueTypes.GET_OPD_SERV_REQS:
      return {
        ...state,
        opd_ser_reqs: action.payload,
      };

    default:
      return state;
  }
}