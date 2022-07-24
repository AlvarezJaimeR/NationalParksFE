import { NEW_AUTH } from './type';
import axios from 'axios';

export const newAuth = (user) => dispatch => {
    axios.post("http://localhost:5000/api/auth/", user)
        .then(auth => {
            localStorage.setItem("token", auth.headers["x-auth-token"]);
            dispatch({
            type: NEW_AUTH,
            payload: auth
    })});
}