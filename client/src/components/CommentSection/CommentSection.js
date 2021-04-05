import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './CommentSection.module.scss';
import axios from 'axios';
import AddComment from '../AddComment';
import CommentBox from '../CommentBox';

function CommentSection(props) {
  const { pageId } = props;
  //const { data, isLoading } = useFetch(`/api/comments/${pageId}`);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/comments/${pageId}`)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [pageId]);

  const postComment = (commentData) => {
    axios
      .post(`/api/comments`, { token, ...commentData }, getConfig())
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        //
      });
  };

  const editComment = (commentId, updatedText) => {
    axios
      .put(
        `/api/comments/${commentId}`,
        { token, commentBody: updatedText },
        getConfig()
      )
      .then((response) => {
        const updatedComments = updateCommentList(comments, response.data);

        setComments(updatedComments);
      });
  };

  const likeComment = (commentId, likerEmail) => {
    axios
      .put(
        `/api/comments/vote/${commentId}`,
        { token, likerEmail },
        getConfig()
      )
      .then((response) => {
        //find the comment to be updated and replace it with the updated version received in response
        const updatedComments = updateCommentList(comments, response.data);

        setComments(updatedComments);
      })
      .catch((error) => {
        // do something eventually
      });
  };

  const sortComments = () => {};

  return (
    <section className={styles.comment_section}>
      <h5>Total Comments ({comments.length})</h5>
      <AddComment
        pageId={pageId}
        postComment={postComment}
        marginDepth={0}
        rootComment={null}
      />
      <div className={styles.comments_container}>
        {isLoading
          ? 'loading...'
          : comments.map((comment) => {
              return (
                <CommentBox
                  commentId={comment._id}
                  pageId={comment.pageId}
                  commentBody={comment.commentBody}
                  likes={comment.likes.length}
                  imageUrl={comment.userPic}
                  username={comment.username}
                  marginDepth={comment.marginDepth}
                  commenterEmail={comment.email}
                  postComment={postComment}
                  likeComment={likeComment}
                  editComment={editComment}
                />
              );
            })}
      </div>
    </section>
  );
}

function getConfig() {
  return {
    headers: {
      'Content-type': 'application/json',
    },
  };
}

/**
 * Inserts the new comment into the comment list and returns the new list.
 * @param {*} allComments
 * @param {*} newComment
 */
function updateCommentList(allComments, newComment) {
  return allComments.map((comment) => {
    if (comment._id === newComment._id) {
      return newComment;
    } else {
      return comment;
    }
  });
}

export default CommentSection;
