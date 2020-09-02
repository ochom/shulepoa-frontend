import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const recordTypes = {
  GET_PATIENTS: 'GET_PATIENTS',
  GET_PATIENT: 'GET_PATIENT',

  GET_SCHEMES: 'GET_SCHEMES',
}


// Registration
export const getPatients = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}records/patients/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENTS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getPatient = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENT, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addPatient = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}records/patients/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getPatients())
      dispatch({ type: commonTypes.SUCCESS, payload: "Patient details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updatePatient = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}records/patients/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getPatients())
      dispatch({ type: commonTypes.SUCCESS, payload: "Patient details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deletePatient = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getPatients())
      dispatch({ type: commonTypes.SUCCESS, payload: "Patient details deleted" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}



// Patient insurance
export const getSchemes = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}records/schemes/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_SCHEMES, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addScheme = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}records/schemes/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSchemes())
      dispatch({ type: commonTypes.SUCCESS, payload: "Scheme details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateScheme = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}records/schemes/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSchemes())
      dispatch({ type: commonTypes.SUCCESS, payload: "Scheme details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


export const deleteScheme = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}records/schemes/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getSchemes())
      dispatch({ type: commonTypes.SUCCESS, payload: "Scheme details deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}