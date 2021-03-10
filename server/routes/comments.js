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
 * @route /comments/:id
 * @description Used to retrieve all comments for a given page
 * @param id - Page id
 * @access Public
 */
router.get('/:id', getComments);

/**
 * @route /comments
 * @description Used to add a new comment to a page
 * @access Public [change to private]
 */
router.post('/', addComment);

/**
 * @route /comments/:id
 * @description Used to update a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/:id', updateComment);

/**
 * @route /comments/:id
 * @description Used to delete a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.delete('/:id', deleteComment);

/**
 * @route /comments/:id
 * @description Used to like a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/like/:id', likeComment);

/**
 * @route /comments/:id
 * @description Used to unlike a comment
 * @param id - Comment id
 * @access Public [change to private]
 */
router.put('/unlike/:id', unlikeComment);

module.exports = router;
