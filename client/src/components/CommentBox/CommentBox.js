import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CommentBox.module.scss';
import PropTypes from 'prop-types';
import InfoBox from '../InfoBox';
import AddComment from '../AddComment';
import IconButton from '../IconButton';

//used in adding indentation to reply comments
const DEPTH_MARGIN = 25;

function CommentBox(props) {
  const {
    likeComment,
    postComment,
    editComment,
    pageId,
    commentBody,
    likes,
    marginDepth,
    commentId,
    imageUrl,
    username,
    commenterEmail,
  } = props;

  const [isReplying, setReplying] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const { email: userEmail } = useSelector((state) => state.auth);

  const handleLike = (event) => {
    event.preventDefault();

    //the email of the person adding/removing their vote
    likeComment(commentId, userEmail);
  };

  return (
    <div
      aria-label='comment'
      className={styles.comment_wrapper}
      style={{ marginLeft: `${DEPTH_MARGIN * marginDepth}px` }}
    >
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
        <IconButton
          iconClass={['fas fa-chevron-up']}
          tooltip='Upvote'
          onClick={handleLike}
        />
        <p className={styles.likes}>{likes}</p>
        <IconButton
          iconClass={['fas fa-reply']}
          tooltip='Reply'
          onClick={() => {
            setReplying(!isReplying);
            setEditing(false);
          }}
        />

        {/**show edit button if the comment belongs to the user logged in */}
        {userEmail === commenterEmail && (
          <IconButton
            iconClass={['fas fa-pen']}
            tooltip='Edit'
            onClick={() => {
              setReplying(!isReplying);
              setEditing(true);
            }}
          />
        )}
      </div>

      {/*Add comment component, for replying to this comment */}
      {isReplying && (
        <AddComment
          pageId={pageId}
          postComment={postComment}
          editComment={editComment}
          marginDepth={marginDepth + 1}
          rootComment={commentId}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

CommentBox.propTypes = {
  likeComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
  commentBody: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  marginDepth: PropTypes.number.isRequired,

  //The email of the person who made this comment
  commenterEmail: PropTypes.string.isRequired,
};

export default CommentBox;
