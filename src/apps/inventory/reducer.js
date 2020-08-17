import { inventoryTypes } from './actions'

const initialState = {
  stores: [],
  store: null,

  units: [],
  unit: null,

  products: [],
  product: null,

  requisitions: [],
  requisition: null,

  suppliers: [],
  supplier: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case inventoryTypes.GET_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case inventoryTypes.ADD_STORE:
    case inventoryTypes.UPDATE_STORE:
      return {
        ...state,
        stores: [...state.stores.filter((_store) => _store.id !== action.payload.id), action.payload]
      };
    case inventoryTypes.DELETE_STORE:
      return {
        ...state,
        stores: state.stores.filter((store) => store.id !== action.payload),
      };

    case inventoryTypes.GET_UNITS:
      return {
        ...state,
        units: action.payload,
      };
    case inventoryTypes.ADD_UNIT:
    case inventoryTypes.UPDATE_UNIT:
      return {
        ...state,
        units: [...state.units.filter((_unit) => _unit.id !== action.payload.id), action.payload]
      };
    case inventoryTypes.DELETE_UNIT:
      return {
        ...state,
        units: state.units.filter((unit) => unit.id !== action.payload),
      };

    case inventoryTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case inventoryTypes.ADD_PRODUCT:
    case inventoryTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter((_product) => _product.id !== action.payload.id), action.payload]
      };
    case inventoryTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };


    case inventoryTypes.GET_REQUISITIONS:
      return {
        ...state,
        requisitions: action.payload,
      };
    case inventoryTypes.ADD_REQUISITION:
    case inventoryTypes.UPDATE_REQUISITION:
      return {
        ...state,
        requisitions: [...state.requisitions.filter((_requisition) => _requisition.id !== action.payload.id), action.payload]
      };
    case inventoryTypes.DELETE_REQUISITION:
      return {
        ...state,
        requisitions: state.requisitions.filter((requisition) => requisition.id !== action.payload),
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


    default:
      return state;
  }
}