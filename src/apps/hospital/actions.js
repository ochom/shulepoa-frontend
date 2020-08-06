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


  GET_SUPPLIER: 'GET_SUPPLIER',
  DELETE_SUPPLIER: 'DELETE_SUPPLIER',
  ADD_SUPPLIER: 'ADD_SUPPLIER',
  UPDATE_SUPPLIER: 'UPDATE_SUPPLIER',


  GET_USERS: 'GET_USERS',
  UPDATE_USER: 'UPDATE_USER',
}

// Hospital
export const loadHospital = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}registration/hospital/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_HOSPITAL, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const addHospital = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}registration/hospital/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_HOSPITAL, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Hospital details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateHospital = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}registration/hospital/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_HOSPITAL, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Hospital details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Insurance
export const loadInsurance = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}registration/insurance/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_INSURANCE, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const searchInsurance = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(
    `${API_PATH}registration/insurance/search/?company_name=${data.company_name}&company_phone=${data.company_phone}`,
    tokenConfig(getState)
  )
    .then(res => {
      dispatch({ type: hospitalTypes.GET_INSURANCE, payload: res.data })
      dispatch({ type: commonTypes.DONE })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addInsurance = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}registration/insurance/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_INSURANCE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateInsurance = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}registration/insurance/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_INSURANCE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deleteInsurance = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}registration/insurance/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.DELETE_INSURANCE, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Insurance details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Services
export const loadService = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}registration/service/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SERVICE, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const searchService = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(
    `${API_PATH}registration/service/search/?name=${data.name}&department=${data.department}`,
    tokenConfig(getState)
  )
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SERVICE, payload: res.data })
      dispatch({ type: commonTypes.DONE })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addService = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}registration/service/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_SERVICE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateService = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}registration/service/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_SERVICE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deleteService = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}registration/service/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.DELETE_SERVICE, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Service details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Suppliers
export const loadSupplier = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}registration/supplier/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SUPPLIER, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const searchSupplier = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(
    `${API_PATH}registration/supplier/search/?name=${data.name}&phone=${data.phone}`,
    tokenConfig(getState)
  )
    .then(res => {
      dispatch({ type: hospitalTypes.GET_SUPPLIER, payload: res.data })
      dispatch({ type: commonTypes.DONE })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addSupplier = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}registration/supplier/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.ADD_SUPPLIER, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const updateSupplier = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}registration/supplier/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_SUPPLIER, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}

export const deleteSupplier = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}registration/supplier/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.DELETE_SUPPLIER, payload: id })
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details saved succesfully" })
    }).catch(err => {
      // dispatch({ type: commonTypes.ERROR, error: err })
    });
}


// Users
export const loadUsers = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}system/users/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.GET_USERS, payload: res.data })
    }).catch(err => {
      // To do
    });
}

export const searchUser = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(
    `${API_PATH}system/users/search/?name=${data.name}&phone=${data.phone}`,
    tokenConfig(getState)
  )
    .then(res => {
      dispatch({ type: hospitalTypes.GET_USERS, payload: res.data })
      dispatch({ type: commonTypes.DONE })
    }).catch(err => {
      // To do
    }).finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateUser = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}system/users/${id}`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: hospitalTypes.UPDATE_USER, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "User details updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err })
    });
}