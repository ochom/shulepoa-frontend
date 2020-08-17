import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const inpatientTypes = {

  GET_INTERVENTIONS: 'GET_INTERVENTIONS',
  ADD_INTERVENTION: 'ADD_INTERVENTION',
  UPDATE_INTERVENTION: 'UPDATE_INTERVENTION',
  DELETE_INTERVENTION: 'DELETE_INTERVENTION',

  GET_REVIEWS: 'GET_REVIEWS',
  ADD_REVIEW: 'ADD_REVIEW',
  UPDATE_REVIEW: 'UPDATE_REVIEW',
  DELETE_REVIEW: 'DELETE_REVIEW',

  GET_IPD_INVESTIGATIONS: 'GET_IPD_INVESTIGATIONS',
  ADD_IPD_INVESTIGATION: 'ADD_IPD_INVESTIGATION',
  DELETE_IPD_INVESTIGATION: 'DELETE_IPD_INVESTIGATION',

  GET_IPD_PRESCRIPTIONS: 'GET_IPD_PRESCRIPTIONS',
  ADD_IPD_PRESCRIPTION: 'ADD_IPD_PRESCRIPTION',
  DELETE_IPD_PRESCRIPTION: 'DELETE_IPD_PRESCRIPTION',

  GET_CHARGEABLES: 'GET_CHARGEABLES',
  ADD_CHARGEABLE: 'ADD_CHARGEABLE',
  DELETE_CHARGEABLE: 'DELETE_CHARGEABLE',

  SAVE_DISCHARGE: 'SAVE_DISCHARGE',

  // wards
  GET_WARDS: 'GET_WARDS',
  ADD_WARD: 'ADD_WARD',
  UPDATE_WARD: 'UPDATE_WARD',
  DELETE_WARD: 'DELETE_WARD',

  GET_ADMITED_PATIENT: 'GET_ADMITED_PATIENT',
  ADMIT_PATIENT: 'ADMIT_PATIENT',
}




export const getInterventions = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/files/${file_id}/interventions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_INTERVENTIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addIntervention = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/files/${file_id}/interventions/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_INTERVENTION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateIntervention = (file_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}inpatient/files/${file_id}/interventions/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.UPDATE_INTERVENTION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteIntervention = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/files/${file_id}/interventions/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_INTERVENTION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}



export const getReviews = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/files/${file_id}/reviews/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_REVIEWS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addReview = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/files/${file_id}/reviews/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_REVIEW, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateReview = (file_id, id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}inpatient/files/${file_id}/reviews/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.UPDATE_REVIEW, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteReview = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/files/${file_id}/reviews/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_REVIEW, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}



export const getInvestigations = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/files/${file_id}/investigations/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_IPD_INVESTIGATIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addInvestigation = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/files/${file_id}/investigations/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_IPD_INVESTIGATION, payload: res.data });
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const deleteInvestigation = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/files/${file_id}/investigations/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_IPD_INVESTIGATION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}



export const getPrescriptions = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/files/${file_id}/prescriptions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_IPD_PRESCRIPTIONS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addPrescription = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/files/${file_id}/prescriptions/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_IPD_PRESCRIPTION, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deletePrescription = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/files/${file_id}/prescriptions/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_IPD_PRESCRIPTION, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}



export const getChargeables = (file_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/files/${file_id}/chargeables/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_CHARGEABLES, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const addChargeable = (file_id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/files/${file_id}/chargeables/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_CHARGEABLE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteChargeable = (file_id, id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/files/${file_id}/chargeables/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_CHARGEABLE, payload: id })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


// Wards actions
export const loadWards = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}inpatient/wards/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_WARDS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


export const addWard = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/wards/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADD_WARD, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Ward details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateWard = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}inpatient/wards/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.UPDATE_WARD, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Ward details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


export const deleteWard = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/wards/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.DELETE_WARD, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Ward details deleted succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


// Patient admission
export const getAdmiedtPatient = (name, id_no, ward) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/admission/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_ADMITED_PATIENT, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const admitPatient = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/admission/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.ADMIT_PATIENT, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Admission details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

