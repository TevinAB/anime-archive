import React, { useState } from 'react';
import styles from './AddComment.module.scss';
import PropTypes from 'prop-types';

function AddComment(props) {
  const { pageId, rootComment, marginDepth, postComment } = props;

  const [commentBody, setCommentBody] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    postComment({
      commentBody,
      pageId,
      rootComment,
      marginDepth,
    });
  };

  return (
    <div className={styles.wrapper}>
      <form method='post' onSubmit={onSubmitHandler}>
        <textarea
          className={styles.text_area}
          placeholder='Share your thoughts...'
          aria-label='add comment'
          onChange={(event) => setCommentBody(event.target.value)}
        >
          {commentBody}
        </textarea>
        <button className={styles.post_button}>Post</button>
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
};

export default AddComment;
