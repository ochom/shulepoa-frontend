import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const revenueTypes = {
  GET_PAYMENT_QUEUE: 'GET_PAYMENT_QUEUE',
  MAKE_PAYMENTS: 'MAKE_PAYMENTS',

  GET_OPD_SERV_REQS: 'GET_OPD_SERV_REQS'
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


// Service Requests
export const getOPDServiceRequests = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}revenue/opd-services/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_OPD_SERV_REQS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


export const addOPDServiceRequest = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/opd-services/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getOPDServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, message: "Request saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getOPDServiceRequest = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}revenue/opd-services/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_OPD_SERV_REQ, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateOPDServiceRequest = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/opd-services/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getOPDServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, message: "Request updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


