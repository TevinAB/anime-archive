const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

/**
 * @route /comments/:pageId
 * @description Used to retrieve all comments for a given page
 * @access Public
 */
router.get('/comments/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const comments = await Comment.find({ pageId });
    res.json(comments);
  } catch (error) {
    res.status(404).send({ msg: 'Comments failed to load' });
  }
});
