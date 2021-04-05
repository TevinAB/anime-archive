const express = require('express');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  likeComment,
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
 * @route /comments/vote/:id
 * @description Used to like a comment
 * @param id - Comment id
 * @access Private
 */
router.put('/vote/:id', auth, likeComment);

module.exports = router;
