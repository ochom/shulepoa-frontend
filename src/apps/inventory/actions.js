import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const inventoryTypes = {
  GET_STORES: 'GET_STORES',
  ADD_STORE: 'ADD_STORE',
  GET_STORE: 'GET_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  DELETE_STORE: 'DELETE_STORE',

  GET_UNITS: 'GET_UNITS',
  ADD_UNIT: 'ADD_UNIT',
  GET_UNIT: 'GET_UNIT',
  UPDATE_UNIT: 'UPDATE_UNIT',
  DELETE_UNIT: 'DELETE_UNIT',

  GET_PRODUCTS: 'GET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  GET_PRODUCT: 'GET_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',

  GET_REQUISITIONS: 'GET_REQUISITIONS',
  ADD_REQUISITION: 'ADD_REQUISITION',
  GET_REQUISITION: 'GET_REQUISITION',
  UPDATE_REQUISITION: 'UPDATE_REQUISITION',
  DELETE_REQUISITION: 'DELETE_REQUISITION',

  GET_SUPPLIERS: 'GET_SUPPLIERS',
  GET_SUPPLIER: 'GET_SUPPLIER',
  DELETE_SUPPLIER: 'DELETE_SUPPLIER',
  ADD_SUPPLIER: 'ADD_SUPPLIER',
  UPDATE_SUPPLIER: 'UPDATE_SUPPLIER',

}

//Stores
export const getStores = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/stores/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_STORES, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addStore = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}inventory/stores/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.ADD_STORE, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Store added succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getStore = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/stores/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_STORE, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateStore = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}inventory/stores/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.UPDATE_STORE, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Store updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteStore = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}inventory/stores/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.DELETE_STORE, payload: id });
      dispatch({ type: commonTypes.SUCCESS, message: "Store deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


//Units
export const getUnits = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/units/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_UNITS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addUnit = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}inventory/units/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.ADD_UNIT, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Unit added succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getUnit = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/units/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_UNIT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateUnit = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}inventory/units/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.UPDATE_UNIT, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Unit updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteUnit = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}inventory/units/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.DELETE_UNIT, payload: id });
      dispatch({ type: commonTypes.SUCCESS, message: "Unit deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


//Products
export const getProducts = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/products/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_PRODUCTS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addProduct = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}inventory/products/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.ADD_PRODUCT, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Product added succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getProduct = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/products/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateProduct = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}inventory/products/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.UPDATE_PRODUCT, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Product updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteProduct = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}inventory/products/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.DELETE_PRODUCT, payload: id });
      dispatch({ type: commonTypes.SUCCESS, message: "Product deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


//Requisitions
export const getRequisitions = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/requisitions/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_REQUISITIONS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addRequisition = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.post(`${API_PATH}inventory/requisitions/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.ADD_REQUISITION, payload: res.data })
      dispatch({ type: commonTypes.SUCCESS, message: "Requisition added succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getRequisition = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.get(`${API_PATH}inventory/requisitions/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.GET_REQUISITION, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateRequisition = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.put(`${API_PATH}inventory/requisitions/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.UPDATE_REQUISITION, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Requisition updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteRequisition = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING });
  Axios.delete(`${API_PATH}inventory/requisitions/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: inventoryTypes.DELETE_REQUISITION, payload: id });
      dispatch({ type: commonTypes.SUCCESS, message: "Requisition deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


// Suppliers
export const getSuppliers = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}inventory/suppliers/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inventoryTypes.GET_SUPPLIERS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const addSupplier = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}inventory/suppliers/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSuppliers())
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const getSupplier = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}inventory/suppliers/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: inventoryTypes.GET_SUPPLIER, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateSupplier = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}inventory/suppliers/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSuppliers())
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteSupplier = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}inventory/suppliers/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getSuppliers())
      dispatch({ type: commonTypes.SUCCESS, message: "Supplier details deleted succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}