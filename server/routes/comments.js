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
    const comments = await Comment.find({ pageId }).select('-__v');
    res.json(comments);
  } catch (error) {
    res.status(404).send({ msg: 'Comments failed to load' });
  }
});

/**
 * @route /comments
 * @description Used to add a new comment to a page
 * @access Public [change to private]
 */
router.post('/comments', async (req, res) => {
  const newComment = new Comment({
    username: req.body.username,
    userPic: req.body.userPic,
    commentBody: req.body.commentBody,
    rootComment: req.body.rootComment,
    marginDepth: req.body.marginDepth,
    pageId: req.body.pageId,
    replies: [],
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to add comment' });
  }
});
