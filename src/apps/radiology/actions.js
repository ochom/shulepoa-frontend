import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { getServiceRequestQueue } from '../revenue/actions';

export const radTypes = {
  GET_LOGBOOKS: 'GET_RAD_LOGBOOKS',
  GET_LOGBOOK: 'GET_RAD_LOGBOOK',
}

export const getLogbooks = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}radiology/logbooks/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.GET_LOGBOOKS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addLogbook = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.post(`${API_PATH}radiology/logbooks/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequestQueue(3))
      dispatch(getLogbooks())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook data created" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const getLogbook = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}radiology/logbooks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.GET_LOGBOOK, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const updateLogbook = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.put(`${API_PATH}radiology/logbooks/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getLogbooks())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook data updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const deleteLogbook = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}radiology/logbooks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getLogbooks())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}