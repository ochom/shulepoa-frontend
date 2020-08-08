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

