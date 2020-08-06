import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const radTypes = {
  GET_RAD_SAMPLING_QUEUE: 'GET_RAD_SAMPLING_QUEUE',
  ADD_RAD_SAMPLE: 'ADD_RAD_SAMPLE',
  GET_RAD_RESULTS_QUEUE: 'GET_RAD_RESULTS_QUEUE',
  ADD_RAD_RESULT: 'ADD_RAD_RESULT',
  GET_RAD_LOGBOOKS: 'GET_RAD_LOGBOOKS',
}

export const getSamplingQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}radiology/sampling/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.GET_RAD_SAMPLING_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveSample = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}radiology/sampling/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: commonTypes.SUCCESS, message: "Sample saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const getResultsQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}radiology/results/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.GET_RAD_RESULTS_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveResults = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}radiology/results/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.ADD_RAD_RESULT, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Results saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}



export const getLogBooks = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}radiology/logbooks/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: radTypes.GET_RAD_LOGBOOKS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}
