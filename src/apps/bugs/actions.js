import Axios from "axios"
import { API_PATH, commonTypes } from "../common/actions"
import { tokenConfig } from "../auth/actions"

export const bugTypes = {
  GET_BUGS: "GET_BUGS",
  ADD_BUG: "ADD_BUG",
  GET_BUG: "GET_BUG",
  UPDATE_BUG: "UPDATE_BUG",
  DELETE_BUG: "DELETE_BUG",

  ADD_REPLY: "ADD_REPLY",
  GET_REPLIES: "GET_REPLIES"
}

const getBugs = () => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}bugs/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: bugTypes.GET_BUGS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

const addBug = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}bugs/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getBugs())
      //dispatch({ type: bugTypes.ADD_BUG, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

const getBug = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}bugs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: bugTypes.GET_BUG, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}


const updateBug = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.put(`${API_PATH}bugs/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getBugs())
      //dispatch({ type: bugTypes.ADD_BUG, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

const deleteBug = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}bugs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getBugs())
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}




const getReplies = (bug_id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`${API_PATH}${bug_id}/replies/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: bugTypes.GET_REPLIES, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

const addReply = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}replies/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getReplies(data.bug_id))
      //dispatch({ type: bugTypes.ADD_BUG, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}



export {
  getBugs, addBug, getBug, updateBug, deleteBug,
  getReplies, addReply
}