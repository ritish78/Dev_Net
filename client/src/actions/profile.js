import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_EXPERIENCE,
    UPDATE_PROFILE
} from './constant';


//Get current user's profile
export const getCurrentUserProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');

        console.log('Response from server:', res);

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


//Create or update current user's profile
export const createOrUpdateProfile = (formData, edit = false) => async (dispatch)=> {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        console.log('Response from server after saving profile info:', res);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });


        dispatch(
            setAlert(
                edit ? 'Profile Updated' : 'Profile Created', 'success'
            )
        );

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.reponse,
                status: error.response.status
             }
        })
    }
}


//Create Experience info of the user
export const createExperience = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile/experience', formData, config);

        // console.log('Response from server after adding experience:', res);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(
            setAlert('Experience Added', 'success')
        );

        // return res.data;

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.reponse,
                status: error.response.status
             }
        })
    }
}


//Create Education info of the user
export const addEducationInfo = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res = await axios.post('/api/profile/education', formData, config);

        console.log('Response from server after adding education info:', res);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(
            setAlert('Education Info Addded', 'success')
        );
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.reponse,
                status: error.response.status
             }
        })
    }
}