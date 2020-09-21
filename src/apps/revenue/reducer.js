import { revenueTypes } from './actions'

const initialState = {
  payment_saved: false,
  payment_queue: [],
  service_requests: [],
  service_request_queue: [],
  invoices: [],
  invoice: null,
  deposits: [],
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


    case revenueTypes.GET_SERVICE_REQUEST_QUEUE:
      return {
        ...state,
        service_request_queue: action.payload,
      };

    case revenueTypes.GET_SERVICE_REQUESTS:
      return {
        ...state,
        service_requests: action.payload,
      };

    case revenueTypes.GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

    case revenueTypes.GET_INVOICE:
      return {
        ...state,
        invoice: action.payload,
      };

    case revenueTypes.GET_DEPOSITS:
      return {
        ...state,
        deposits: action.payload,
      };



    default:
      return state;
  }
}