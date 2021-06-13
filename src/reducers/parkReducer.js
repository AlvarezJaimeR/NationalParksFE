import { GET_PARK } from "../actions/type";

const initialState = {
    items: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PARK:
            return {
                ...state,
                items: action.payload
            }
            default:
                return state;
    }
}