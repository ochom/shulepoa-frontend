import { bugTypes } from "./actions";

const initialState = {
    bugs: [],
    bug: null,
    replies: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case bugTypes.GET_BUGS:
            return {
                ...state,
                bugs: action.payload
            }
        case bugTypes.GET_BUG:
            return {
                ...state,
                bug: action.payload
            }
        case bugTypes.GET_REPLIES:
            return {
                ...state,
                replies: action.payload
            }
        default:
            return {
                ...state
            }
    }
}