import { GET_POST } from "../actions/type";

const initialState = {
    items: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}