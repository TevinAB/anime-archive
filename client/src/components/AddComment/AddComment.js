import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './AddComment.module.scss';
import PropTypes from 'prop-types';

function AddComment(props) {
  const {
    pageId,
    rootComment,
    marginDepth,
    postComment,
    editComment,
    isEditing,
  } = props;
  const { email, username, profilePic, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [commentBody, setCommentBody] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    //determine which function gets called
    !isEditing
      ? postComment({
          email,
          username,
          profilePic,
          commentBody,
          pageId,
          rootComment,
          marginDepth,
        })
      : editComment(rootComment, commentBody);

    setCommentBody('');
  };

  return (
    <div className={styles.wrapper}>
      <form method='post' onSubmit={onSubmitHandler}>
        <textarea
          className={styles.text_area}
          placeholder='Share your thoughts...'
          aria-label='add comment'
          onChange={(event) => setCommentBody(event.target.value)}
          value={commentBody}
        ></textarea>
        <button className={styles.post_button} disabled={!isAuthenticated}>
          {isAuthenticated ? 'Post' : 'Log In to Post Comment'}
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  //The page where the comment was added.
  pageId: PropTypes.string.isRequired,

  //A function that will be called when the user posts a comment.
  postComment: PropTypes.func.isRequired,

  //The id of the comment(if any) that this comment was a reply to.
  rootComment: PropTypes.string,

  //Used to determine how much indentation a comment will have.
  marginDepth: PropTypes.number,

  //If this component is being used to edit a comment or add a new one
  isEditing: PropTypes.bool,
};

AddComment.defaultProps = {
  isEditing: false,
};

export default AddComment;
