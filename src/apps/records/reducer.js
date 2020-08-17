import { recordTypes } from './actions.js'

const initialState = {
  patients_list: [],
  patient: null,
  patient_insurance_list: [],
  patient_health_files: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case recordTypes.GET_PATIENTS:
      return {
        ...state,
        patients_list: action.payload,
      };

    case recordTypes.GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };

    case recordTypes.ADD_PATIENT:
      return {
        ...state,
        patients_list: [action.payload,],
      };
    case recordTypes.UPDATE_PATIENT:
      return {
        ...state,
        patients_list: [action.payload,],
      };
    case recordTypes.DELETE_PATIENT:
      return {
        ...state,
        patients_list: state.patients_list.filter((patient) => patient.id !== action.payload),
      };

    case recordTypes.GET_SCHEMES:
      return {
        ...state,
        patient_insurance_list: action.payload,
      };
    case recordTypes.ADD_SCHEME:
      return {
        ...state,
        patient_insurance_list: [...state.patient_insurance_list, action.payload],
      };
    case recordTypes.UPDATE_SCHEME:
      return {
        ...state,
        patient_insurance_list: [...state.patient_insurance_list.filter((scheme) => scheme.id !== action.payload.id), action.payload,],
      };
    case recordTypes.DELETE_SCHEME:
      return {
        ...state,
        patient_insurance_list: state.patient_insurance_list.filter((scheme) => scheme.id !== action.payload),
      };


    case recordTypes.GET_PATIENT_HEALTH_FILES:
      return {
        ...state,
        patient_health_files: action.payload,
      };
    case recordTypes.ADD_HEALTH_FILE:
      return {
        ...state,
        patient_health_files: [...state.patient_health_files.filter((_file) => _file.id !== action.payload.id), action.payload,],
      };

    default:
      return state;
  }
}