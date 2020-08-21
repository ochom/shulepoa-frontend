import { revenueTypes } from './actions'

const initialState = {
  payment_saved: false,
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

    case revenueTypes.SAVING_PAYMENT:
      return {
        ...state,
        payment_saved: false,
      };

    case revenueTypes.PAYMENT_SAVED:
      return {
        ...state,
        payment_saved: true,
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