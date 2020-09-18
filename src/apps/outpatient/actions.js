import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { addServiceRequest } from '../revenue/actions';

export const outpatientTypes = {
  GET_APPOINTMENTS: 'GET_APPOINTMENTS',
  GET_APPOINTMENT: 'GET_APPOINTMENT',

  GET_VITALS: 'GET_VITALS',
  GET_OBSERVATIONS: 'GET_OBSERVATIONS',
  GET_INVESTIGATIONS: 'GET_INVESTIGATIONS',
  GET_DIAGNOSISS: 'GET_DIAGNOSISS',
  GET_PRESCRIPTIONS: 'GET_PRESCRIPTIONS',
  SAVE_DISCHARGE: 'SAVE_DISCHARGE',
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
      dispatch(getAppointments())
      data['appointment_id'] = res.data.id
      data[''] = "Clinic Fee"
      dispatch(addServiceRequest(data))
      dispatch({ type: commonTypes.SUCCESS, payload: "Appointment details saved succesfully" })
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
  Axios.put(`${API_PATH}outpatient/appointments/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getAppointments())
      dispatch(getAppointment(id))
      dispatch({ type: commonTypes.SUCCESS, payload: "Appointment details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

// Vitals
export const getVitals = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}outpatient/vitals/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_VITALS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addVital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/vitals/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getVitals())
      dispatch({ type: commonTypes.SUCCESS, payload: "Vitals saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateVital = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}outpatient/vitals/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getVitals())
      dispatch({ type: commonTypes.SUCCESS, payload: "Vital details updated succesfully" })
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
      dispatch(getVitals())
      dispatch({ type: commonTypes.SUCCESS, payload: "Vital deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

//Observations
export const getObservations = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}outpatient/observations/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_OBSERVATIONS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addObservation = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/observations/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getObservations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation added successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateObservation = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}outpatient/observations/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getObservations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation updated successfully" })
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
      dispatch(getObservations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Observation deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Investigations
export const getInvestigations = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}outpatient/investigations/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_INVESTIGATIONS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addInvestigation = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/investigations/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getInvestigations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Investigation added successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateInvestigation = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}outpatient/investigations/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getInvestigations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Investigation updated successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteInvestigation = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}outpatient/investigations/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getInvestigations())
      dispatch({ type: commonTypes.SUCCESS, payload: "Investigation deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Prescriptions
export const getPrescriptions = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}outpatient/prescriptions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_PRESCRIPTIONS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addPrescription = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/prescriptions/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getPrescriptions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Prescription added successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updatePrescription = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}outpatient/prescriptions/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getPrescriptions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Prescription updated successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deletePrescription = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}outpatient/prescriptions/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getPrescriptions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Prescription deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Diagnosiss
export const getDiagnosis = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}outpatient/diagnosis/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: outpatientTypes.GET_DIAGNOSISS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addDiagnosis = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}outpatient/diagnosis/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getDiagnosis())
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis added successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateDiagnosis = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}outpatient/diagnosis/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getDiagnosis())
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis updated successfully" })
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
      dispatch(getDiagnosis())
      dispatch({ type: commonTypes.SUCCESS, payload: "Diagnosis deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}
