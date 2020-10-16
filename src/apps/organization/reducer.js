import {
  orgTypes,
} from './actions'

const initialState = {
  organization_profile: null,
  departments: [],
  classes: [],
  classrooms: [],
  subjects: [],


  clinics: [],
  insurances: [],
  services: [],
  departments: [],
  groups: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case orgTypes.GET_ORGANIZATION:
      return {
        ...state,
        organization_profile: action.payload,
      };

    case orgTypes.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case orgTypes.GET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };

    case orgTypes.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
      };

    case orgTypes.GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };




    case orgTypes.GET_CLINICS:
      return {
        ...state,
        clinics: action.payload,
      };

    case orgTypes.GET_INSURANCES:
      return {
        ...state,
        insurances: action.payload,
      };


    case orgTypes.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    case orgTypes.GET_WARDS:
      return {
        ...state,
        departments: action.payload,
      };

    case orgTypes.GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };

    case orgTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };


    default:
      return state;
  }
}