const express = require('express');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  sortComments,
} = require('../handlers/comments');
const { auth } = require('../middleware/auth');

/**
 * @route /comments/:id
 * @description Used to retrieve all comments for a given page
 * @param id - Page id
 * @access Public
 */
router.get('/:id', getComments);

/**
 * @route /comments/sort/:sortType/:id
 * @description Used to sort comments by a specific sort order
 * @param sortType - The sort order type [newest, oldest,top]
 * @param id - Page id
 * @access Public
 */
router.get('/sort/:sortType/:id', sortComments);

/**
 * @route /comments
 * @description Used to add a new comment to a page
 * @access Private
 */
router.post('/', auth, addComment);

/**
 * @route /comments/:id
 * @description Used to update a comment
 * @param id - Comment id
 * @access Private
 */
router.put('/:id', auth, updateComment);

/**
 * @route /comments/:id
 * @description Used to delete a comment
 * @param id - Comment id
 * @access Private
 */
router.delete('/:id', auth, deleteComment);

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
