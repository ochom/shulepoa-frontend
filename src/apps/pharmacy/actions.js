import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { loadService } from '../hospital/actions'

export const pharmTypes = {
  GET_PHARM_QUEUE: 'GET_PHARM_QUEUE',
  GET_PATIENT_REQUESTS: 'GET_PATIENT_REQUESTS',
  ADD_DRUG_DISPENSE: 'ADD_DRUG_DISPENSE',
  GET_PHARM_REORDER_HISTORY: 'GET_PHARM_REORDER_HISTORY',
  ADD_PHARM_REORDER: 'ADD_PHARM_REORDER',
}

export const getQueue = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}pharmacy/queue/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_PHARM_QUEUE, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const getPatientRequests = (patient_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}pharmacy/queue/${patient_id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_PATIENT_REQUESTS, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveDrugDispense = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}pharmacy/dispense/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.ADD_DRUG_DISPENSE, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Dispense saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


export const saveReorder = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}pharmacy/reorders/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      loadService();
      getReordersHistory();
      dispatch({ type: pharmTypes.ADD_PHARM_REORDER, payload: res.data });
      dispatch({ type: commonTypes.SUCCESS, message: "Reorder saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, error: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}




export const getReordersHistory = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}pharmacy/reorders/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_PHARM_REORDER_HISTORY, payload: res.data })
    }).catch(err => {
      // To do
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}
