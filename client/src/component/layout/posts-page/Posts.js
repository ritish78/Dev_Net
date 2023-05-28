import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../../actions/post';
import Spinner from '../dashboard/Spinner';
import PostItem from './PostItem';

const Posts = props => {
    
    const { getAllPosts, post: { posts, loading } } = props;

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        loading ? <Spinner /> : (
            <div className="container">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className='fas fa-user'></i> Welcome to the community
                </p>
                <div className="posts">
                    {
                        posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))
                    }
                </div>
            </div>
        ) 
    )
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);