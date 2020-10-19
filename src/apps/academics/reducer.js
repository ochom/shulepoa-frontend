import { academicTypes } from "./actions"

const initialState = {
  exams: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case academicTypes.GET_EXAMS:
      return {
        ...state,
        exams: action.payload
      }
    default:
      return state
  }
}