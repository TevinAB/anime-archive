const express = require('express');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
} = require('../handlers/comments');

/**
 * @description Used to retrieve all comments for a given page
 * @param id - Page id
 * @access Public
 */
router.get('/comments/:id', getComments);

/**
 * @description Used to add a new comment to a page
 * @access Public [change to private]
 */
router.post('/comments', addComment);

/**
 * @description Used to update a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/comments/:id', updateComment);

/**
 * @description Used to delete a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.delete('/comments/:id', deleteComment);

/**
 * @description Used to like a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/comments/like/:id', likeComment);

/**
 * @description Used to unlike a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/comments/unlike/:id', unlikeComment);

module.exports = router;
