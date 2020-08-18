import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const recordTypes = {
  GET_PATIENTS: 'GET_PATIENTS',
  ADD_PATIENT: 'ADD_PATIENT',
  GET_PATIENT: 'GET_PATIENT',
  UPDATE_PATIENT: 'UPDATE_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',

  GET_SCHEMES: 'GET_SCHEMES',
  DELETE_SCHEME: 'DELETE_SCHEME',
  ADD_SCHEME: 'ADD_SCHEME',
  UPDATE_SCHEME: 'UPDATE_SCHEME',

  GET_APPOINTMENTS: 'GET_APPOINTMENTS',
  GET_PATIENT_APPOINTMENTS: 'GET_PATIENT_APPOINTMENTS',
  ADD_APPOINTMENT: 'ADD_APPOINTMENT',
}


// Registration
export const getPatients = () => (dispatch, getState) => {
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
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details saved succesfully" })
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
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details updated succesfully" })
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
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details deleted" })
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
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details saved succesfully" })
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
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details updated succesfully" })
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
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}




// Appointments
export const getAppointments = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}records/appointments/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_APPOINTMENTS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


export const addAppointment = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}records/appointments/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointments())
      dispatch({ type: commonTypes.SUCCESS, message: "Appointment details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getAppointment = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}records/appointments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_APPOINTMENT, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateAppointment = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}records/appointments/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointments())
      dispatch({ type: commonTypes.SUCCESS, message: "Appointment details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}


