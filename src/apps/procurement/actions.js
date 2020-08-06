import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const procurementTypes = {
  GET_STORES: 'GET_PAYMENT_QUEUE',
  ADD_STORE: 'ADD_STORE',
  GET_STORE: 'GET_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  DELETE_STORE: 'DELETE_STORE',
}

export const getStores = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}procurement/stores/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: procurementTypes.GET_STORES, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addStore = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}procurement/stores/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: procurementTypes.ADD_STORE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Store added succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


export const getStore = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}procurement/stores/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: procurementTypes.GET_STORE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateStore = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}procurement/stores/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: procurementTypes.UPDATE_STORE, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Store updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteStore = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}procurement/stores/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: procurementTypes.DELETE_STORE, payload: id });
      dispatch({ type: commonTypes.SUCCESS, message: "Store deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}