import { inventoryTypes } from './actions'

const initialState = {
  stores: [],
  store: null,
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


    default:
      return state;
  }
}