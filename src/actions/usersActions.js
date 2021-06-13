import { GET_USERS, NEW_USER, LOG_OUT, LOG_IN} from './type';
import axios from 'axios';

export const getUsers = () => dispatch => {
    console.log('Hit getUsers');
    axios.get("http://localhost:5000/api/users/")
        .then(users => {
            console.log(users);
            dispatch({
            type: GET_USERS,
            payload: users.data
    })});
}

export const newUser = (user) => dispatch => {
    console.log('Hit newUser');
    axios.post("http://localhost:5000/api/users/", user)
        .then(user => {
            console.log(user);
            dispatch({
            type: NEW_USER,
            payload: user
    })});
}

export const logout = () => {
    console.log('logout');
    return {
        type: LOG_OUT,
    }
}

export const login = ()  => {
    console.log('login');
    return {
        type: LOG_IN,
    }
}