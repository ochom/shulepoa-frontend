import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const hospitalTypes = {
  GET_HOSPITAL: 'GET_HOSPITAL',
  ADD_HOSPITAL: 'ADD_HOSPITAL',
  UPDATE_HOSPITAL: 'UPDATE_HOSPITAL',

  GET_CLINICS: "GET_CLINICS",
  ADD_CLINIC: 'ADD_CLINIC',
  UPDATE_CLINIC: 'UPDATE_CLINIC',
  DELETE_CLINIC: 'DELETE_CLINIC',

  GET_INSURANCES: 'GET_INSURANCES',
  ADD_INSURANCE: 'ADD_INSURANCE',
  UPDATE_INSURANCE: 'UPDATE_INSURANCE',
  DELETE_INSURANCE: 'DELETE_INSURANCE',


  GET_SERVICES: 'GET_SERVICES',
  ADD_SERVICE: 'ADD_SERVICE',
  UPDATE_SERVICE: 'UPDATE_SERVICE',
  DELETE_SERVICE: 'DELETE_SERVICE',

  GET_USERS: 'GET_USERS',
  UPDATE_USER: 'UPDATE_USER',
}

// Hospital
export const getHospital = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/hospital/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_HOSPITAL, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addHospital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/hospital/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getHospital())
      dispatch({ type: commonTypes.SUCCESS, payload: "Hospital details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateHospital = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/hospital/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getHospital())
      dispatch({ type: commonTypes.SUCCESS, payload: "Hospital details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Clinics
export const getClinics = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/clinics/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_CLINICS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addClinic = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/clinics/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClinics())
      dispatch({ type: commonTypes.SUCCESS, payload: "Clinic details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateClinic = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/clinics/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClinics())
      dispatch({ type: commonTypes.SUCCESS, payload: "Clinic details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteClinic = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}organization/clinics/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getClinics())
      dispatch({ type: commonTypes.SUCCESS, payload: "Clinic details deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Insurance
export const getInsurances = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/insurance/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_INSURANCES, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addInsurance = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/insurance/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getInsurances())
      dispatch({ type: commonTypes.SUCCESS, payload: "Insurance details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateInsurance = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/insurance/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getInsurances())
      dispatch({ type: commonTypes.SUCCESS, payload: "Insurance details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteInsurance = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}organization/insurance/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getInsurances())
      dispatch({ type: commonTypes.SUCCESS, payload: "Insurance details deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Services
export const getServices = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/service/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SERVICES, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const addService = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/service/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServices())
      dispatch({ type: commonTypes.SUCCESS, payload: "Service details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateService = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/service/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServices())
      dispatch({ type: commonTypes.SUCCESS, payload: "Service details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteService = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}organization/service/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getServices())
      dispatch({ type: commonTypes.SUCCESS, payload: "Service details deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Users
export const getUsers = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}users/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_USERS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


export const updateUser = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}users/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getUsers())
      dispatch({ type: commonTypes.SUCCESS, payload: "User details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}