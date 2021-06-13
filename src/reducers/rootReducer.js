import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import parkReducer from "./parkReducer";

export default combineReducers({
    auth: authReducer,
    getUsers: usersReducer,
    newUser: usersReducer,
    logout: usersReducer,
    login: usersReducer,
    getPark: parkReducer
});