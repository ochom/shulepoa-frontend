import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from 'axios'

export const revenueTypes = {
  GET_PAYMENT_QUEUE: 'GET_PAYMENT_QUEUE',
  SAVING_PAYMENT: 'SAVING_PAYMENT',
  PAYMENT_SAVED: 'PAYMENT_SAVED',

  GET_SERVICE_REQUESTS: 'GET_SERVICE_REQUESTS',
  GET_SERVICE_REQUEST_QUEUE: 'GET_SERVICE_REQUEST_QUEUE',

  GET_INVOICES: 'GET_INVOICES',
  GET_INVOICE: 'GET_INVOICE',

  GET_DEPOSITS: 'GET_DEPOSITS'
}


export const getPaymentQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING });
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

export const savePayment = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  dispatch({ type: revenueTypes.SAVING_PAYMENT })
  Axios.post(`${API_PATH}revenue/payment-queue/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch(getPaymentQueue())
      dispatch({ type: revenueTypes.PAYMENT_SAVED })
      dispatch({ type: commonTypes.SUCCESS, payload: 'Payment saved succesfully' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


// Service Requests
export const getServiceRequestQueue = (department = 0) => (dispatch, getState) => {
  Axios.get(`${API_PATH}revenue/service-requests-queue/?department=${department}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_SERVICE_REQUEST_QUEUE, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getServiceRequests = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}revenue/service-requests/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_SERVICE_REQUESTS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addServiceRequest = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/service-requests/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Request saved succesfully' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getServiceRequest = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}revenue/service-requests/${id}/`, tokenConfig(getState))
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

export const updateServiceRequest = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.patch(`${API_PATH}revenue/service-requests/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Request updated succesfully' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteServiceRequest = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}revenue/service-requests/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Service request deleted' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


//Invoice
export const getInvoices = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}revenue/invoices/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_INVOICES, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addInvoice = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}revenue/invoices/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getInvoices())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Invoice saved' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getInvoice = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}revenue/invoices/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_INVOICE, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateInvoice = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.patch(`${API_PATH}revenue/invoices/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getInvoices())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Invoice updated' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteInvoice = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}revenue/invoices/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getInvoices())
      dispatch({ type: commonTypes.SUCCESS, payload: 'Invoice deleted' })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


// Deposits
export const getDeposits = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}revenue/deposits/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: revenueTypes.GET_DEPOSITS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


export const addDeposit = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}revenue/deposits/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getDeposits())
      dispatch({ type: commonTypes.SUCCESS, payload: "Deposit details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateDeposit = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}revenue/deposits/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getDeposits())
      dispatch({ type: commonTypes.SUCCESS, payload: "Deposit details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


export const deleteDeposit = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}revenue/deposits/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getDeposits())
      dispatch({ type: commonTypes.SUCCESS, payload: "Deposit details deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}