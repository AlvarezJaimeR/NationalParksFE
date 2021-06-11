import { GET_USERS } from './type';
import axios from 'axios';

export const getUsers = () => dispatch => {
    console.log('Hit get_users');
    axios.get("http://localhost:5000/api/users/")
        .then(users => {
            console.log(users);
            dispatch({
            type: GET_USERS,
            payload: users.data
    })});
}