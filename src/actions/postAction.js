import { GET_POST, NEW_POST} from './type';
import axios from 'axios';

export const getPost = (userId) => {
    return async dispatch => {
        await axios
        .get(`http://localhost:5000/api/posts/${userId}`)
        .then(post => {
            dispatch ({
                type: GET_POST,
                payload: post.data
            })
        })
    }
}

export const newPost = (userId, post) => {
    return async dispatch => {
        await axios
        .post(`http://localhost:5000/api/posts/${userId}/post`, {
            text: post.text
        })
        .then(post => {
            dispatch ({
                type: NEW_POST,
                payload: post.data
            })
        })
    }
}