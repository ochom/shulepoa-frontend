import Axios from "axios";
import { tokenConfig } from "../auth/actions";

export const API_PATH =
  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000/api/' : process.env.NODE_ENV === 'production' ?
      'https://hosipoa-backend.herokuapp.com/api/' : "/";

export const commonTypes = {
  PROCESSING: 'PROCESSING',
  SILENT_PROCESSING: 'SILENT_PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  DASHBOARD_DATA: 'DASHBOARD_DATA',
  DONE: 'DONE',

  LOAD_ICD10: "LOAD_ICD10",
};


export const loadDashboardData = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}registration/dashboard/data/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: commonTypes.DASHBOARD_DATA, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.DONE, })
    })
}

export const loadICD10 = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`https://gist.githubusercontent.com/cryocaustik/b86de96e66489ada97c25fc25f755de0/raw/b31a549638a609004e9a45f8933c3f37bdf4c27d/icd10_codes.json`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: commonTypes.LOAD_ICD10, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE, })
    })
}

