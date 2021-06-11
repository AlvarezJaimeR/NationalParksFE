import { NEW_AUTH } from './type';
import axios from 'axios';

export const newAuth = (user) => dispatch => {
    console.log('Hit newAuth');
    axios.post("http://localhost:5000/api/users/", user)
        .then(auth => dispatch({
            type: NEW_AUTH,
            payload: auth.data
    }));
}