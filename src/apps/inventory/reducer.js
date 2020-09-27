import { inventoryTypes } from './actions'

const initialState = {
  stores: [],
  categories: [],
  units: [],
  products: [],
  requisitions: [],
  suppliers: [],
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case inventoryTypes.GET_STORES:
      return {
        ...state,
        stores: action.payload,
      };

    case inventoryTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case inventoryTypes.GET_UNITS:
      return {
        ...state,
        units: action.payload,
      };

    case inventoryTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case inventoryTypes.GET_REQUISITIONS:
      return {
        ...state,
        requisitions: action.payload,
      };

    case inventoryTypes.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      }

    case inventoryTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
}