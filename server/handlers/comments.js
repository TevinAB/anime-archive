const Comment = require('../models/Comment');
const { updateAndSaveDoc } = require('../utils/helpers');

module.exports = {
  getComments: async (req, res) => {
    try {
      //The page's id
      const { id } = req.params;
      const comments = await Comment.find({ pageId: id }).select('-__v');
      res.json(comments);
    } catch (error) {
      res.status(404).send({ msg: 'Comments failed to load' });
    }
  },

  addComment: async (req, res) => {
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

      //Update the root comment's data, if this comment was a reply.
      const rootCommentId = savedComment.rootComment;
      if (rootCommentId) {
        await updateAndSaveDoc(rootCommentId, Comment, (comment) =>
          comment.replies.push(savedComment._id)
        );
      }

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(400).json({ msg: 'Failed to add comment' });
    }
  },

  updateComment: async (req, res) => {
    const errorMessage = 'Failed to update comment';

    await editHandler(
      res,
      updateAndSaveDoc.bind(
        this,
        req.id,
        Comment,
        (comment) =>
          (comment.commentBody = req.body.commentBody || comment.commentBody)
      ),
      errorMessage
    );
  },

  deleteComment: async (req, res) => {
    const errorMessage = 'Error deleting comment';

    await editHandler(
      res,
      updateAndSaveDoc.bind(
        this,
        req.id,
        Comment,
        (comment) => (comment.commentBody = 'This comment was deleted')
      ),
      errorMessage
    );
  },

  likeComment: async (req, res) => {
    const errorMessage = 'Error liking comment';

    await editHandler(
      res,
      updateAndSaveDoc.bind(
        this,
        req.id,
        Comment,
        (comment) => (comment.likes += 1)
      ),
      errorMessage
    );
  },

  unlikeComment: async (req, res) => {
    const errorMessage = 'Error unliking comment';

    await editHandler(
      res,
      updateAndSaveDoc.bind(
        this,
        req.id,
        Comment,
        (comment) => (comment.likes -= 1)
      ),
      errorMessage
    );
  },
};

async function editHandler(res, updateDoc, errorMsg) {
  try {
    const updatedDoc = await updateDoc();
    res.json(updatedDoc);
  } catch (error) {
    res.status(400).json({ msg: errorMsg });
  }
}
