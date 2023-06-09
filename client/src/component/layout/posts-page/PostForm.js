import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAPost } from '../../../actions/post';

const PostForm = props => {

    const { createAPost } = props;

    const [text, setText] = useState('');

    const onSubmitHandler = e => {
        e.preventDefault();

        createAPost({ text });
        //Clearing the form
        setText('');
    }

    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmitHandler(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    createAPost: PropTypes.func.isRequired
}

export default connect(null, { createAPost })(PostForm)