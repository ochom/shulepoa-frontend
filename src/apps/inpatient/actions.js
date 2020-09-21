import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { getPatients } from '../records/actions';

export const inpatientTypes = {
  GET_ADMISSIONS: 'GET_ADMISSIONS',
  GET_ADMISSION: 'GET_ADMISSION',
  GET_INTERVENTIONS: 'GET_INTERVENTIONS',
  GET_REVIEWS: 'GET_REVIEWS',
  GET_INVESTIGATIONS: 'GET_IPD_INVESTIGATIONS',
  GET_PRESCRIPTIONS: 'GET_IPD_PRESCRIPTIONS',
  GET_VITALS: 'GET_IPD_VITALS',
}

// Admissions
export const getAdmissions = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}inpatient/admissions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_ADMISSIONS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addAdmission = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/admissions/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getPatients())
      dispatch(getAdmissions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Admission saved" })
    }).catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const getAdmission = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/admissions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getAdmissions())
      dispatch({ type: inpatientTypes.GET_ADMISSION, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateAdmission = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}inpatient/admissions/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getAdmissions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Admission updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteAdmission = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/admissions/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getAdmissions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Admission deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


// Interventions
export const getInterventions = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/interventions/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_INTERVENTIONS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addIntervention = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/interventions/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getInterventions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Intervention saved" })
    }).catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateIntervention = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}inpatient/interventions/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getInterventions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Intervention updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteIntervention = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/interventions/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getInterventions())
      dispatch({ type: commonTypes.SUCCESS, payload: "Intervention deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


// Vitals
export const getVitals = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}inpatient/vitals/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_VITALS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addVital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}inpatient/vitals/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.patch(`${API_PATH}inpatient/vitals/${id}/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.delete(`${API_PATH}inpatient/vitals/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getVitals())
      dispatch({ type: commonTypes.SUCCESS, payload: "Vital deleted successfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Reviews
export const getReviews = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inpatient/reviews/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inpatientTypes.GET_REVIEWS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addReview = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inpatient/reviews/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getReviews())
      dispatch({ type: commonTypes.SUCCESS, payload: "Review saved" })
    }).catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateReview = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}inpatient/reviews/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getReviews())
      dispatch({ type: commonTypes.SUCCESS, payload: "Review updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteReview = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inpatient/reviews/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getReviews())
      dispatch({ type: commonTypes.SUCCESS, payload: "Review deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


