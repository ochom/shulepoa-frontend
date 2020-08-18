import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const outpatientTypes = {

  GET_TRIAGE_QUEUE: 'GET_TRIAGE_QUEUE',
  ADD_VITALS: 'ADD_VITALS',


  GET_APPOINTMENT_QUEUE: 'GET_APPOINTMENT_QUEUE',

  GET_OBSERVATIONS: 'GET_OBSERVATIONS',
  ADD_OBSERVATION: 'ADD_OBSERVATION',
  UPDATE_OBSERVATION: 'UPDATE_OBSERVATION',
  DELETE_OBSERVATION: 'DELETE_OBSERVATION',

  GET_INVESTIGATIONS: 'GET_INVESTIGATIONS',
  ADD_INVESTIGATION: 'ADD_INVESTIGATION',
  UPDATE_INVESTIGATION: 'UPDATE_INVESTIGATION',
  DELETE_INVESTIGATION: 'DELETE_INVESTIGATION',

  GET_PRESCRIPTIONS: 'GET_PRESCRIPTIONS',
  ADD_PRESCRIPTION: 'ADD_PRESCRIPTION',
  UPDATE_PRESCRIPTION: 'UPDATE_PRESCRIPTION',
  DELETE_PRESCRIPTION: 'DELETE_PRESCRIPTION',

  SAVE_DISCHARGE: 'SAVE_DISCHARGE',
}

// Triage
export const loadTriageQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/triage/queues/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_TRIAGE_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addVitals = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}outpatient/triage/vitals/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.ADD_VITALS, payload: data.health_file })
      dispatch({ type: commonTypes.SUCCESS, message: "Vitals saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Consultation
export const loadAppointmentQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/appointments/queue/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_APPOINTMENT_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const getObservations = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/appointments/${file_id}/observations/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_OBSERVATIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addObservation = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}outpatient/appointments/${file_id}/observations/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.ADD_OBSERVATION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateObservation = (file_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}outpatient/appointments/${file_id}/observations/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.UPDATE_OBSERVATION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteObservation = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}outpatient/appointments/${file_id}/observations/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.DELETE_OBSERVATION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


// investigations
export const getInvestigations = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/appointments/${file_id}/investigations/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_INVESTIGATIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addInvestigation = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}outpatient/appointments/${file_id}/investigations/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.ADD_INVESTIGATION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateInvestigation = (file_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}outpatient/appointments/${file_id}/investigations/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.UPDATE_INVESTIGATION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteInvestigation = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}outpatient/appointments/${file_id}/investigations/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.DELETE_INVESTIGATION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


// prescriptions
export const getPrescriptions = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}outpatient/appointments/${file_id}/prescriptions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_PRESCRIPTIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addPrescription = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}outpatient/appointments/${file_id}/prescriptions/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.ADD_PRESCRIPTION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updatePrescription = (file_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}outpatient/appointments/${file_id}/prescriptions/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.UPDATE_PRESCRIPTION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deletePrescription = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}outpatient/appointments/${file_id}/prescriptions/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.DELETE_PRESCRIPTION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveDischarge = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}outpatient/health-files/${file_id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: commonTypes.SUCCESS, message: "Discharge note saved succesfully" })
      dispatch({ type: outpatientTypes.SAVE_DISCHARGE, payload: data.discharge_note })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}