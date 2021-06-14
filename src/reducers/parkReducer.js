import { GET_PARK, FILTER_NATIONAL_PARK } from "../actions/type";

const initialState = {
    items: []
}

const parkReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PARK:
            return {
                ...state,
                items: action.payload.data
            }
        case FILTER_NATIONAL_PARK:
            return {
                items: action.payload
            }
            default:
                return state;
    }
}
export default parkReducer;