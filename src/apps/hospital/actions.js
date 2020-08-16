import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const hospitalTypes = {
  GET_HOSPITAL: 'GET_HOSPITAL',
  ADD_HOSPITAL: 'ADD_HOSPITAL',
  UPDATE_HOSPITAL: 'UPDATE_HOSPITAL',


  GET_INSURANCE: 'GET_INSURANCE',
  DELETE_INSURANCE: 'DELETE_INSURANCE',
  ADD_INSURANCE: 'ADD_INSURANCE',
  UPDATE_INSURANCE: 'UPDATE_INSURANCE',


  GET_SERVICE: 'GET_SERVICE',
  DELETE_SERVICE: 'DELETE_SERVICE',
  ADD_SERVICE: 'ADD_SERVICE',
  UPDATE_SERVICE: 'UPDATE_SERVICE',

  GET_USERS: 'GET_USERS',
  UPDATE_USER: 'UPDATE_USER',
}

// Hospital
export const loadHospital = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/hospital/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_HOSPITAL, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const addHospital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/hospital/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_HOSPITAL, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Hospital details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateHospital = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/hospital/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_HOSPITAL, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Hospital details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Insurance
export const loadInsurance = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/insurance/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_INSURANCE, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const addInsurance = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/insurance/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_INSURANCE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateInsurance = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/insurance/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_INSURANCE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deleteInsurance = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}organization/insurance/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.DELETE_INSURANCE, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Services
export const getServices = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}organization/service/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SERVICE, payload: res.data })
    }).catch(err => {
      // To do
    });
}


export const addService = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}organization/service/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_SERVICE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateService = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}organization/service/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_SERVICE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deleteService = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}organization/service/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.DELETE_SERVICE, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Users
export const getUsers = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}users/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_USERS, payload: res.data })
    }).catch(err => {
      // To do
    });
}


export const updateUser = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}users/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_USER, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "User details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}