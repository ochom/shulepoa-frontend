import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const recordTypes = {
  GET_STUDENTS: 'GET_STUDENTS',
  GET_STUDENT: 'GET_STUDENT',

  GET_TEACHERS: 'GET_TEACHERS',
  GET_TEACHER: 'GET_TEACHER',

  GET_STAFFS: 'GET_STAFFS',
  GET_STAFF: 'GET_STAFF',
}


// Students
export const getStudents = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}profiles/students/`, tokenConfig(getState))
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

export const addStudent = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/students/`, JSON.stringify(data), tokenConfig(getState))
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

export const getStudent = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}profiles/students/${id}/`, tokenConfig(getState))
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

export const updateStudent = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/students/${id}/`, JSON.stringify(data), tokenConfig(getState))
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
  Axios.delete(`${API_PATH}profiles/students/${id}/`, tokenConfig(getState))
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

//Teachers
export const getTeachers = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}profiles/teachers/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_TEACHERS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addTeacher = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/teachers/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getTeachers())
      dispatch({ type: commonTypes.SUCCESS, payload: "Teacher details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getTeacher = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}profiles/teachers/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_TEACHER, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateTeacher = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/teachers/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getTeachers())
      dispatch({ type: commonTypes.SUCCESS, payload: "Teacher details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteTeacher = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/teachers/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getTeachers())
      dispatch({ type: commonTypes.SUCCESS, payload: "Teacher details deleted" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

//Staffs
export const getStaffs = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.get(`${API_PATH}profiles/staffs/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_STAFFS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const addStaff = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/staffs/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getStaffs())
      dispatch({ type: commonTypes.SUCCESS, payload: "Staff details saved succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const getStaff = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}profiles/staffs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: recordTypes.GET_STAFF, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const updateStaff = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/staffs/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getStaffs())
      dispatch({ type: commonTypes.SUCCESS, payload: "Staff details updated succesfully" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}

export const deleteStaff = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/staffs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getStaffs())
      dispatch({ type: commonTypes.SUCCESS, payload: "Staff details deleted" })
    })
    .catch((err) => {
      dispatch({ type: commonTypes.ERROR, payload: err });
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE });
    })
}