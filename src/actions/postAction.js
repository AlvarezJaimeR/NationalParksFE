import { GET_POST } from './type';
import axios from 'axios';

export const getPost = () => {
    return async dispatch => {
        await axios
        .get("http://localhost:5000/api/posts/")
        .then(post => {
            console.log(post);
            dispatch ({
                type: GET_POST,
                payload: post.data
            })
        })
    }
}