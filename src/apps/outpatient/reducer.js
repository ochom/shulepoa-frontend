import { outpatientTypes } from './actions'

const initialState = {
  appointments: [],
  appointment: null,
};

export default function (state = initialState, action) {
  var app = state.appointment
  switch (action.type) {
    case outpatientTypes.GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };

    case outpatientTypes.GET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
      };

    case outpatientTypes.DELETE_VITAL:
      var vitals = state.appointment.vitals.filter(obj => obj.id !== action.payload)
      app.vitals = vitals
      return {
        ...state,
        appointment: app,
      };

    case outpatientTypes.DELETE_OBSERVATION:
      var observations = state.appointment.observations.filter(obj => obj.id !== action.payload)
      app.observations = observations
      return {
        ...state,
        appointment: app,
      };

    case outpatientTypes.DELETE_DIAGNOSIS:
      var diagnosis = state.appointment.diagnosis.filter(obj => obj.id !== action.payload)
      app.diagnosis = diagnosis
      return {
        ...state,
        appointment: app,
      };

    default:
      return state;
  }
}