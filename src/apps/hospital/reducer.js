import {
  hospitalTypes,
} from './actions'

const initialState = {
  hospital_profile: null,
  clinics: [],
  insurances: [],
  services: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case hospitalTypes.GET_HOSPITAL:
      return {
        ...state,
        hospital_profile: action.payload[0],
      };

    case hospitalTypes.GET_CLINICS:
      return {
        ...state,
        clinics: action.payload,
      };

    case hospitalTypes.GET_INSURANCES:
      return {
        ...state,
        insurances: action.payload,
      };


    case hospitalTypes.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };


    case hospitalTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
}