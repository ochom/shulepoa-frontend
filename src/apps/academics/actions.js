import Axios from "axios";
import { tokenConfig } from "../auth/actions";
import { API_PATH, commonTypes } from "../common/actions";

export const academicTypes = {
  GET_EXAMS: "GET_EXAMS"
}


// Exams
export const getExams = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}academics/exams/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: academicTypes.GET_EXAMS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addExam = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}academics/exams/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getExams())
      dispatch({ type: commonTypes.SUCCESS, payload: "Exam saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateExam = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}academics/exams/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getExams())
      dispatch({ type: commonTypes.SUCCESS, payload: "Exam updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteExam = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}academics/exams/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getExams())
      dispatch({ type: commonTypes.SUCCESS, payload: "Exam deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}
