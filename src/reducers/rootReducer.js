import { combineReducers } from 'redux';
import authReducer from './authReducer';
import getUsersReducer from './getUsersReducer';

export default combineReducers({
    auth: authReducer,
    getUsers: getUsersReducer
});