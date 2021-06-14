import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import parkReducer from "./parkReducer";
import postReducer from "./postReducer";

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    park: parkReducer,
    post: postReducer
});