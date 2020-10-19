import { recordTypes } from './actions.js'

const initialState = {
  students: [],
  student: null,
  teachers: [],
  teacher: null,
  staffs: [],
  staff: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case recordTypes.GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };

    case recordTypes.GET_STUDENT:
      return {
        ...state,
        student: action.payload,
      };

    case recordTypes.GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
      };

    case recordTypes.GET_TEACHER:
      return {
        ...state,
        teacher: action.payload,
      };

    case recordTypes.GET_STAFFS:
      return {
        ...state,
        staffs: action.payload,
      };

    case recordTypes.GET_STAFF:
      return {
        ...state,
        staff: action.payload,
      };


    default:
      return state;
  }
}