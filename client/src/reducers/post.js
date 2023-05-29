import { 
    PROFILE_ERROR,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    CREATE_POST,
    GET_POST,
    DELETE_COMMENT,
    ADD_COMMENT
} from "../actions/constant";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}


export default function postReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:  
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } 
                    : post),
                loading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        (comment) => comment._id !== payload
                    )
                },
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { comments: payload, ...state.post},
                loading: false
            }
        default:
            return state;
    }
}


