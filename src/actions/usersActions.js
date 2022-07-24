import { GET_USERS, NEW_USER, LOG_OUT, LOG_IN} from './type';
import axios from 'axios';

export const getUsers = () => dispatch => {
    axios.get("http://localhost:5000/api/users/")
        .then(users => {
            dispatch({
            type: GET_USERS,
            payload: users.data
    })});
}

export const newUser = (user) => dispatch => {
    axios.post("http://localhost:5000/api/users/", user)
        .then(user => {
            localStorage.setItem("token", user.headers["x-auth-token"]);
            dispatch({
            type: NEW_USER,
            payload: user
    })});
}

export const logout = () => {
    return {
        type: LOG_OUT,
    }
}

export const login = ()  => {
    return {
        type: LOG_IN,
    }
}