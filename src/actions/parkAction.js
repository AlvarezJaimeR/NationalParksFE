import { GET_PARK } from './type';
import axios from 'axios';

export const getPark = () => dispatch => {
    axios.get(`https://developer.nps.gov/api/v1/parks?&api_key=t6gYQ5xCA0LgivhLEO2zbVfKa3pWcZcdix1CPozR`)
    .then(park => {
        console.log(park);
        dispatch ({
        type: GET_PARK,
        payload: park.data
    })});
}

