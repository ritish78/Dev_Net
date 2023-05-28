import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../dashboard/Spinner';
import { getPostById } from '../../../actions/post';
import { Link, useParams } from 'react-router-dom';
import CommentItem from './CommentItem';
import PostItem from '../posts-page/PostItem';
import CommentForm from './CommentForm';
import CommentTop from './CommentTop';

const Comment = props => {
    const { getPostById, post: { post, loading } } = props;
    const { postId } = useParams();

    useEffect(() => {
        getPostById(postId)
    }, [getPostById, postId]);


    if (loading) {
        return <Spinner />
    }

    return (
        <section className="container">
            <Link to="/posts" className="btn btn-light">
                Back To Posts
            </Link>
            { console.log({post, loading, postId}) }
            <CommentTop post={post} />
            <CommentForm postId={post._id} />
            <div>
                { post.comments.map((comment) => (
                    <CommentItem key={comment._id} postId={post._id} comment={comment} />
                ))}
            </div>
        </section>
    )
}

Comment.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPostById })(Comment)