import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { getServiceRequests, getServiceRequestQueue } from '../revenue/actions';

export const labTypes = {
  GET_LOGBOOKS: 'GET_LAB_LOGBOOKS',
  GET_LOGBOOK: 'GET_LAB_LOGBOOK',
}


export const saveSample = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}laboratory/sampling/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequests())
      dispatch({ type: commonTypes.SUCCESS, message: "Sample saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const getLogbooks = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}laboratory/logbooks/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LOGBOOKS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addLogbook = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.post(`${API_PATH}laboratory/logbooks/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.get(`${API_PATH}laboratory/logbooks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LOGBOOK, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const updateLogbook = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.put(`${API_PATH}laboratory/logbooks/${id}/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.delete(`${API_PATH}laboratory/logbooks/${id}/`, tokenConfig(getState))
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


