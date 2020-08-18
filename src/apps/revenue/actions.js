import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const revenueTypes = {
  GET_PAYMENT_QUEUE: 'GET_PAYMENT_QUEUE',
  MAKE_PAYMENTS: 'MAKE_PAYMENTS',
}

export const loadPaymentQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}revenue/payment-queue/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: revenueTypes.GET_PAYMENT_QUEUE, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const savePayment = (patient_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/payment-queue/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: revenueTypes.MAKE_PAYMENTS, payload: patient_id })
      dispatch({ type: commonTypes.SUCCESS, message: "Payment saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


// Service requests
export const requestService = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/service-requests/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: commonTypes.SUCCESS, message: "Service requested succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
}