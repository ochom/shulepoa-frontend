import {
  hospitalTypes,
} from './actions'

const initialState = {
  hospital_profile: null,
  insurance_list: [],
  service_list: [],
  users_list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case hospitalTypes.GET_HOSPITAL:
      return {
        ...state,
        hospital_profile: action.payload[0],
      };
    case hospitalTypes.ADD_HOSPITAL:
    case hospitalTypes.UPDATE_HOSPITAL:
      return {
        ...state,
        hospital_profile: action.payload,
      };


    case hospitalTypes.GET_SUPPLIER:
      return {
        ...state,
        supplier_list: action.payload,
      };
    case hospitalTypes.ADD_SUPPLIER:
      return {
        ...state,
        supplier_list: [...state.supplier_list, action.payload,],
      };
    case hospitalTypes.UPDATE_SUPPLIER:
      return {
        ...state,
        supplier_list: [action.payload,],
      };
    case hospitalTypes.DELETE_SUPPLIER:
      return {
        ...state,
        supplier_list: state.supplier_list.filter((supplier) => supplier.id !== action.payload),
      };


    case hospitalTypes.GET_INSURANCE:
      return {
        ...state,
        insurance_list: action.payload,
      };
    case hospitalTypes.ADD_INSURANCE:
      return {
        ...state,
        insurance_list: [...state.insurance_list, action.payload,],
      };
    case hospitalTypes.UPDATE_INSURANCE:
      return {
        ...state,
        insurance_list: [action.payload,],
      };
    case hospitalTypes.DELETE_INSURANCE:
      return {
        ...state,
        insurance_list: state.insurance_list.filter((insurance) => insurance.id !== action.payload),
      };


    case hospitalTypes.GET_SERVICE:
      return {
        ...state,
        service_list: action.payload,
      };
    case hospitalTypes.ADD_SERVICE:
      return {
        ...state,
        service_list: [...state.service_list, action.payload,],
      };
    case hospitalTypes.UPDATE_SERVICE:
      return {
        ...state,
        service_list: [action.payload,],
      };
    case hospitalTypes.DELETE_SERVICE:
      return {
        ...state,
        service_list: state.service_list.filter((service) => service.id !== action.payload),
      };

    case hospitalTypes.GET_USERS:
      return {
        ...state,
        users_list: action.payload,
      };

    default:
      return state;
  }
}