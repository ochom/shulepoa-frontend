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

  GET_HEALTH_FILES: 'GET_HEALTH_FILES',
  GET_PATIENT_HEALTH_FILES: 'GET_PATIENT_HEALTH_FILES',
  ADD_HEALTH_FILE: 'ADD_HEALTH_FILE',
}


// Registration
export const getPatients = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}records/patients/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENTS, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const getPatient = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENT, payload: res.data })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const searchPatients = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(
    `${API_PATH}records/patients/search/?fullname=${data.fullname}&id_no=${data.id_no}&phone=${data.phone}`,
    tokenConfig(getState)
  )
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENTS, payload: res.data })
      dispatch({ type: commonTypes.DONE })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addPatient = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}records/patients/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.ADD_PATIENT, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updatePatient = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}records/patients/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.UPDATE_PATIENT, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deletePatient = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.DELETE_PATIENT })
      dispatch({ type: commonTypes.SUCCESS, message: "Patient details deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}



// Patient insurance
export const loadScheme = (patient_id) => (dispatch, getState) => {
  Axios.get(`${API_PATH}records/patient/${patient_id}/schemes/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_SCHEMES, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const addScheme = (patient_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}records/patient/${patient_id}/schemes/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.ADD_SCHEME, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateScheme = (patient_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}records/patient/${patient_id}/schemes/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.UPDATE_SCHEME, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}


export const deleteScheme = (patient_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}records/patient/${patient_id}/schemes/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.DELETE_SCHEME, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Scheme details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}




// Health files
export const loadHealthFiles = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}outpatient/health-files/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_HEALTH_FILES, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const getPatientHealthFiles = (patient_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/${patient_id}/health-files/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_PATIENT_HEALTH_FILES, payload: res.data })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addHealthFile = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/health-files/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.ADD_HEALTH_FILE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "HealthFile details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err.data })
    });
}
