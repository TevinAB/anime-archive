import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CommentBox.module.scss';
import PropTypes from 'prop-types';
import InfoBox from '../InfoBox';
import AddComment from '../AddComment';
import IconButton from '../IconButton';

function CommentBox(props) {
  const {
    likeComment,
    postComment,
    deleteComment,
    editComment,
    pageId,
    commentBody,
    likes,
    marginDepth,
    commentId,
    imageUrl,
    username,
    email,
  } = props;

  const [isReplying, setReplying] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div aria-label='comment'>
      {/*Displays comment info*/}
      <InfoBox
        imagePath={imageUrl}
        title={username}
        bodyTexts={[{ value: commentBody }]}
        imageClass={[styles.img]}
        mainWrapperClass={[styles.info_box]}
      />

      {/*Comment Actions- like, reply, edit, delete */}
      <div className={styles.comment_actions}>
        <IconButton iconClass={['fas fa-chevron-up']} tooltip='Upvote' />
        <p className={styles.likes}>{likes}</p>
        <IconButton
          iconClass={['fas fa-reply']}
          tooltip='Reply'
          onClick={() => setReplying(!isReplying)}
        />
        <IconButton iconClass={['fas fa-pen']} tooltip='Edit' />
        <IconButton iconClass={['fas fa-trash']} tooltip='Delete' />
      </div>

      {/*Add comment component, for replying to this comment */}
      {isReplying && (
        <AddComment
          pageId={pageId}
          postComment={postComment}
          marginDepth={marginDepth}
          rootComment={commentId}
        />
      )}
    </div>
  );
}

CommentBox.propTypes = {
  likeComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  commentBody: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  marginDepth: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default CommentBox;
