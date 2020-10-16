import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const recordTypes = {
  GET_STUDENTS: 'GET_STUDENTS',
  GET_STUDENT: 'GET_STUDENT',
}


// Registration
export const getStudents = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}records/patients/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_STUDENTS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getStudent = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_STUDENT, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addStudent = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}records/patients/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getStudents())
      dispatch({ type: commonTypes.SUCCESS, payload: "Student details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateStudent = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}records/patients/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getStudents())
      dispatch({ type: commonTypes.SUCCESS, payload: "Student details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteStudent = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}records/patients/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getStudents())
      dispatch({ type: commonTypes.SUCCESS, payload: "Student details deleted" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}