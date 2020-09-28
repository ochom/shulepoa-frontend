import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { addServiceRequest } from '../revenue/actions';
import { getPatients } from '../records/actions';

export const outpatientTypes = {
  GET_APPOINTMENTS: 'GET_APPOINTMENTS',
  GET_APPOINTMENT: 'GET_APPOINTMENT',

  DELETE_VITAL: 'DELETE_VITALS',
  DELETE_OBSERVATION: 'DELETE_OBSERVATIONS',
  DELETE_DIAGNOSIS: 'DELETE_DIAGNOSISS',
}

// Appointments
export const getAppointments = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING });
  Axios.get(`${API_PATH}outpatient/appointments/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_APPOINTMENTS, payload: res.data })
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
  Axios.post(`${API_PATH}outpatient/appointments/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getPatients())
      dispatch(getAppointments())
      data['appointment_id'] = res.data.id
      data[''] = "Clinic Fee"
      dispatch(addServiceRequest(data))
      dispatch({ type: commonTypes.SUCCESS, payload: "Appointment saved" })
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
  Axios.get(`${API_PATH}outpatient/appointments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_APPOINTMENT, payload: res.data })
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
  Axios.patch(`${API_PATH}outpatient/appointments/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointments())
      dispatch(getAppointment(id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Appointment updated" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

// Vitals
export const addVital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/vitals/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Vitals saved" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateVital = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.patch(`${API_PATH}outpatient/vitals/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Vital updated" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteVital = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}outpatient/vitals/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({ type: outpatientTypes.DELETE_VITAL, payload: id })
      dispatch({ type: commonTypes.SUCCESS, payload: "Vital deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

//Observations
export const addObservation = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/observations/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation added" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateObservation = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.patch(`${API_PATH}outpatient/observations/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteObservation = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}outpatient/observations/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({ type: outpatientTypes.DELETE_OBSERVATION, payload: id })
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Diagnosiss
export const addDiagnosis = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/diagnosis/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis added" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateDiagnosis = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.patch(`${API_PATH}outpatient/diagnosis/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getAppointment(data.appointment_id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteDiagnosis = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}outpatient/diagnosis/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch({ type: outpatientTypes.DELETE_DIAGNOSIS, payload: id })
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}
