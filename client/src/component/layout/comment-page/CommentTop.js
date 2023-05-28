import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import { connect } from "react-redux";
import {
  addLikeOrRemoveLikeOnPost,
  deletePostById,
} from "../../../actions/post";

const CommentTop = (props) => {
  const {
    auth,
    addLikeOrRemoveLikeOnPost,
    deletePostById,
    post: { _id, user, text, name, avatar, likes, comments, date },
  } = props;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date, 9)}</p>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => addLikeOrRemoveLikeOnPost(_id)}
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          {likes && likes.length > 0 && <span>{likes.length}</span>}
          </button>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => deletePostById(_id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
      </div>
    </div>
  );
};

CommentTop.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeOrRemoveLikeOnPost: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLikeOrRemoveLikeOnPost,
  deletePostById,
})(CommentTop);
