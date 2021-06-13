import { GET_USERS, NEW_USER, LOG_OUT, LOG_IN} from '../actions/type';

const initialState = {
    items: [],
    authentication: false
}

export default function(state = initialState, action){
    switch(action.type){ 
        case GET_USERS:
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case NEW_USER:
            return {
                ...state, //previous state
                items: [action.payload, ...state.items], //array of comment objects being pulled from the API
            };  
        case LOG_IN:
            return {
                ...state,
                items: [action.payload, ...state.items],
                authentication: true
            }
        case LOG_OUT:
            return {
                ...state,
                items: [],
                authentication: false
            }
        default: 
            return state;
    }
}