import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    getUsers: usersReducer,
    newUser: usersReducer,
    logout: usersReducer,
    login: usersReducer
});