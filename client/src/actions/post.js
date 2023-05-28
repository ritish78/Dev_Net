import axios from "axios";
import { setAlert } from "./alert";
import { 
    GET_POSTS, 
    POST_ERROR, 
    UPDATE_LIKES,
    DELETE_POST,
    CREATE_POST,
    GET_POST,
    DELETE_COMMENT,
    ADD_COMMENT
} from "./constant";


//Creating a post by a user
//Get all posts
export const createAPost = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/post', formData, config);

        dispatch({
            type: CREATE_POST,
            payload: res.data
        });

        dispatch(
            setAlert('Post Created Successfully', 'success')
        )
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}



//Get all posts
export const getAllPosts = () => async (dispatch) => {
    try {

        const res = await axios.get('/api/post');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}


//Get a post by its id
export const getPostById = postId => async (dispatch) => {
    try {

        const res = await axios.get(`/api/post/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        });
    }
}


//Add like/unlike to a post
export const addLikeOrRemoveLikeOnPost = (postId) => async (dispatch) => {
    try {

        const res = await axios.post(`/api/post/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}


//Delete a post
//Add like/unlike to a post
export const deletePostById = (postId) => async (dispatch) => {
    try {

        const res = await axios.delete(`/api/post/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(
            setAlert('Post Deleted Successfully', 'success')
        )

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}


//Delete comment by post id and comment id
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {

        const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}


//Add comment to a post
export const addComment = (postId, formData) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/post/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(
            setAlert('Commented on the post', 'success')
        )

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response,
                status: error.response.status
            }
        })
    }
}