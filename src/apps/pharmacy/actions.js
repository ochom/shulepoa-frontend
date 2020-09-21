import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"
import { getServiceRequestQueue } from '../revenue/actions';

export const pharmTypes = {
  GET_DRUGS: 'GET_DRUGS',
  GET_REORDERS: 'GET_REORDERS',

  GET_DISPENSE: 'GET_PHARM_DISPENSE',
  GET_LOGBOOK: 'GET_PHARM_LOGBOOK',
}


export const getDispenses = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}pharmacy/dispense/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_DISPENSE, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addDispense = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.post(`${API_PATH}pharmacy/dispense/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getServiceRequestQueue(5))
      dispatch(getDispenses())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook data created" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const getDispense = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}pharmacy/dispense/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_LOGBOOK, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateDispense = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.patch(`${API_PATH}pharmacy/dispense/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getDispenses())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook data updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteDispense = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.delete(`${API_PATH}pharmacy/dispense/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getDispenses())
      dispatch({ type: commonTypes.SUCCESS, payload: "logbook deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


//Drugs
export const getDrugs = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}pharmacy/drugs/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_DRUGS, payload: res.data });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addDrug = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}pharmacy/drugs/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getDrugs());
      dispatch({ type: commonTypes.SUCCESS, payload: "Drug saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const updateDrug = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}pharmacy/drugs/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getDrugs());
      dispatch({ type: commonTypes.SUCCESS, payload: "Drug updated succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const deleteDrug = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}pharmacy/drugs/${id}/`, tokenConfig(getState))
    .then(() => {
      dispatch(getDrugs());
      dispatch({ type: commonTypes.SUCCESS, payload: "Drug deleted succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}


//Reorders
export const getReorders = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}pharmacy/reorders/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: pharmTypes.GET_REORDERS, payload: res.data });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}

export const addReorder = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}pharmacy/reorders/`, JSON.stringify(data), tokenConfig(getState))
    .then(() => {
      dispatch(getReorders());
      dispatch(getDrugs());
      dispatch({ type: commonTypes.SUCCESS, payload: "Reorder saved succesfully" });
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() =>
      dispatch({ type: commonTypes.DONE })
    );
}