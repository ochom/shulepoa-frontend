import { inventoryTypes } from './actions'

const initialState = {
  stores: [],
  store: null,

  categories: [],
  category: null,

  units: [],
  unit: null,

  products: [],
  product: null,

  requisitions: [],
  requisition: null,

  suppliers: [],
  supplier: null,

  orders: [],
  order: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case inventoryTypes.GET_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case inventoryTypes.GET_STORE:
      return {
        ...state,
        store: action.payload
      };


    case inventoryTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case inventoryTypes.GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };


    case inventoryTypes.GET_UNITS:
      return {
        ...state,
        units: action.payload,
      };
    case inventoryTypes.GET_UNIT:
      return {
        ...state,
        unit: action.payload
      };


    case inventoryTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case inventoryTypes.GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };


    case inventoryTypes.GET_REQUISITIONS:
      return {
        ...state,
        requisitions: action.payload,
      };
    case inventoryTypes.GET_REQUISITION:
      return {
        ...state,
        requisition: action.payload,
      };


    case inventoryTypes.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };
    case inventoryTypes.GET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };


    case inventoryTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case inventoryTypes.GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };


    default:
      return state;
  }
}