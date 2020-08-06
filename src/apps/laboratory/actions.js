import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const labTypes = {
  GET_LAB_SAMPLING_QUEUE: 'GET_LAB_SAMPLING_QUEUE',
  ADD_LAB_SAMPLE: 'ADD_LAB_SAMPLE',
  GET_LAB_RESULTS_QUEUE: 'GET_LAB_RESULTS_QUEUE',
  ADD_LAB_RESULT: 'ADD_LAB_RESULT',
  GET_LAB_VERIFICATION_QUEUE: 'GET_LAB_VERIFICATION_QUEUE',
  ADD_LAB_VERIFICATION: 'ADD_LAB_VERIFICATION',
  GET_LAB_LOGBOOKS: 'GET_LAB_LOGBOOKS',
}

export const getSamplingQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}laboratory/sampling/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LAB_SAMPLING_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveSample = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}laboratory/sampling/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.get(`${API_PATH}laboratory/results/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LAB_RESULTS_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveResults = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}laboratory/results/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.ADD_LAB_RESULT, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Results saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const getVerificationQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}laboratory/verifications/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LAB_VERIFICATION_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveVerification = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}laboratory/verifications/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.ADD_LAB_VERIFICATION, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Verification saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const getLogBooks = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}laboratory/logbooks/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: labTypes.GET_LAB_LOGBOOKS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}
