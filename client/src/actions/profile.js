import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR
} from './constant';


//Get current user's profile
export const getCurrentUserProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({ 
            type: GET_PROFILE,
            payload: res.data
         });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.reponse,
                status: error.response.status
             }
        })
    }
}