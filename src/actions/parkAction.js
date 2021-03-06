import { FILTER_NATIONAL_PARK, GET_PARK } from './type';
import axios from 'axios';

export const getPark = () => {
    return async dispatch => {
    await axios.get(`https://developer.nps.gov/api/v1/parks?&api_key=t6gYQ5xCA0LgivhLEO2zbVfKa3pWcZcdix1CPozR`)
    .then(park => {
        dispatch ({
        type: GET_PARK,
        payload: park.data
    })});
}
}

export const filterNationalPark = (parks) => {
    const tempParks = parks.filter(parks => parks.designation === "National Park");
    return {
        type: FILTER_NATIONAL_PARK,
        payload: tempParks
    }
}  