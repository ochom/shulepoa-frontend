import { API_PATH, commonTypes } from '../common/actions'
import { tokenConfig } from '../auth/actions';
import Axios from "axios"

export const orgTypes = {
  GET_ORGANIZATION: 'GET_ORGANIZATION',
  GET_DEPARTMENTS: "GET_DEPARTMENTS",
  GET_CLASSES: "GET_CLASSES",
  GET_CLASSROOMS: "GET_CLASSROOMS",
  GET_SUBJECTS: "GET_SUBJECTS",

  GET_CLINICS: "GET_CLINICS",
  GET_INSURANCES: 'GET_INSURANCES',
  GET_SERVICES: 'GET_SERVICES',
  GET_WARDS: 'GET_WARDS',
  GET_GROUPS: 'GET_GROUPS',
  GET_USERS: 'GET_USERS',
}

// Organization
export const getOrganization = () => (dispatch, getState) => {
  var id = getState().auth.user.organization;
  Axios.get(`${API_PATH}profiles/organization/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_ORGANIZATION, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateOrganization = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/organization/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getOrganization())
      dispatch({ type: commonTypes.SUCCESS, payload: "Organization saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Departments
export const getDepartments = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}profiles/departments/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_DEPARTMENTS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addDepartment = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/departments/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getDepartments())
      dispatch({ type: commonTypes.SUCCESS, payload: "Department saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateDepartment = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/departments/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getDepartments())
      dispatch({ type: commonTypes.SUCCESS, payload: "Department updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteDepartment = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/departments/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getDepartments())
      dispatch({ type: commonTypes.SUCCESS, payload: "Department deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}



// Classes
export const getClasses = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}profiles/classes/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_CLASSES, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addClass = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/classes/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClasses())
      dispatch({ type: commonTypes.SUCCESS, payload: "Class saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateClass = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/classes/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClasses())
      dispatch({ type: commonTypes.SUCCESS, payload: "Class updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteClass = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/classes/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getClasses())
      dispatch({ type: commonTypes.SUCCESS, payload: "Class deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Classrooms
export const getClassrooms = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}profiles/classrooms/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_CLASSROOMS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addClassroom = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/classrooms/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClassrooms())
      dispatch({ type: commonTypes.SUCCESS, payload: "Classroom saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateClassroom = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/classrooms/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getClassrooms())
      dispatch({ type: commonTypes.SUCCESS, payload: "Classroom updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteClassroom = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/classrooms/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getClassrooms())
      dispatch({ type: commonTypes.SUCCESS, payload: "Classroom deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Subjects
export const getSubjects = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}profiles/subjects/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_SUBJECTS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addSubject = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}profiles/subjects/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSubjects())
      dispatch({ type: commonTypes.SUCCESS, payload: "Subject saved succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateSubject = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}profiles/subjects/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getSubjects())
      dispatch({ type: commonTypes.SUCCESS, payload: "Subject updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const deleteSubject = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}profiles/subjects/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getSubjects())
      dispatch({ type: commonTypes.SUCCESS, payload: "Subject deleted succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}


// Groups
export const getGroups = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}groups/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_GROUPS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const addGroup = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}groups/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getGroups())
      dispatch({ type: commonTypes.SUCCESS, payload: "Group added" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const updateGroup = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.SILENT_PROCESSING })
  Axios.patch(`${API_PATH}groups/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getGroups())
      // dispatch({ type: commonTypes.SUCCESS, payload: "Group updated" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

export const deleteGroup = (id) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.delete(`${API_PATH}groups/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(getGroups())
      dispatch({ type: commonTypes.SUCCESS, payload: "Group deleted" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    })
}

// Users
export const getUsers = () => (dispatch, getState) => {
  Axios.get(`${API_PATH}users/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: orgTypes.GET_USERS, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const addUser = (data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.post(`${API_PATH}users/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getUsers())
      dispatch({ type: commonTypes.SUCCESS, payload: "User registered" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

export const updateUser = (id, data) => (dispatch, getState) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.patch(`${API_PATH}users/${id}/`, JSON.stringify(data), tokenConfig(getState))
    .then(res => {
      dispatch(getUsers())
      dispatch({ type: commonTypes.SUCCESS, payload: "User updated succesfully" })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE })
    });
}

