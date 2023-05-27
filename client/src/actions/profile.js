import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
    GET_ALL_PROFILES,
    GET_REPOS,
    RESET_PROFILE_LOADING
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
            type: CLEAR_PROFILE
        });

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: error.reponse,
                status: error.response.status
             }
        });
    }
}


//Get all user's profile
export const getAllUserProfile = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: RESET_PROFILE_LOADING });

    try {
        const res = await axios.get('/api/profile');

        dispatch({ 
            type: GET_ALL_PROFILES,
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


//Get profile by its id
export const getUserProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

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


//Delete experience by its id
export const deleteExperienceById = id => async (dispatch) => {
    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(
            setAlert('Experience info deleted successfully', 'success')
        )

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


//Delete education by its id
export const deleteEducationById = id => async (dispatch) => {
    try {

        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(
            setAlert('Education info deleted successfully', 'success')
        )

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


//Delete User's account and profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure that you want to delete your account? This action can not be reversed!')){

        try {
            /*
                There are two api endpoints to delete user, and their
                profile. /api/users enpoint deletes the whole user including
                their profile and posts. We will be deleting their 
                profile with a DELETE request on /api/profile.
            */

            const res = await axios.delete('/api/profile');
    
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: DELETE_ACCOUNT
            });
    
            dispatch(
                setAlert('Your account has been deleted successfully', 'success')
            )
    
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
}



//Get Github repos of user
//Get current user's profile
export const getUserGithubRepo = (githubUsername) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${githubUsername}`);

        console.log('Response from server:', res);

        dispatch({ 
            type: GET_REPOS,
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