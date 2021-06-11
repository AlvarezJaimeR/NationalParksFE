import { GET_USERS, NEW_USER} from '../actions/type';

const initialState = {
    items: []
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
                items: [action.payload, ...state.items] //array of comment objects being pulled from the API
            };  
        default: 
            return state;
    }
}