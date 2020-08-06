import { procurementTypes } from './actions'

const initialState = {
  stores: [],
  store: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case procurementTypes.GET_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case procurementTypes.ADD_STORE:
    case procurementTypes.UPDATE_STORE:
      return {
        ...state,
        stores: [...state.stores.filter((_store) => _store.id !== action.payload.id), action.payload]
      };
    case procurementTypes.DELETE_STORE:
      return {
        ...state,
        stores: state.stores.filter((store) => store.id !== action.payload),
      };


    default:
      return state;
  }
}