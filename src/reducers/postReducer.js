import { GET_POST, NEW_POST } from "../actions/type";

const initialState = {
    items: []
}

const parkReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                items: action.payload
            }
        case NEW_POST:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        default:
            return state;
    }
}

export default parkReducer;