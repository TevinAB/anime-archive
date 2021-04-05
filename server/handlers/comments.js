const Comment = require('../models/Comment');
const {
  editHandler,
  updateAndSaveDoc,
  buildCommentList,
} = require('./helpers');

module.exports = {
  getComments: async (req, res) => {
    try {
      //The page's id
      const { id } = req.params;
      const allComments = await Comment.find({ pageId: id }).select('-__v');

      const sortedComments = allComments
        .slice()
        .sort((a, b) => b.date - a.date);

      const commentList = buildCommentList(sortedComments);

      res.json(commentList);
    } catch (error) {
      res.status(404).send({ msg: 'Comments failed to load' });
    }
  },

  addComment: async (req, res) => {
    const newComment = new Comment({
      username: req.body.username,
      userPic: req.body.profilePic,
      email: req.body.email,
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

      /**Build comment list to respond with */

      const allComments = await Comment.find({
        pageId: req.body.pageId,
      }).select('-__v');
      //sort by date is the default. Newest to oldest.
      const sortedComments = allComments
        .slice()
        .sort((a, b) => b.date - a.date);

      const commentList = buildCommentList(sortedComments);

      res.status(201).json(commentList);
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
        req.params.id,
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
      updateAndSaveDoc.bind(this, req.params.id, Comment, (comment) => {
        comment.commentBody = '[This comment was deleted]';
        comment.deleted = true;
      }),
      errorMessage
    );
  },

  likeComment: async (req, res) => {
    const errorMessage = 'Error liking comment';
    //get the email of the user who liked the comment
    const { likerEmail: email } = req.body;

    function handleLike(comment) {
      //if the user already liked this comment, remove like, else add it
      if (comment.likes.includes(email)) {
        comment.likes = comment.likes.filter(
          (storedEmail) => storedEmail !== email
        );
      } else {
        comment.likes.push(email);
      }
    }

    await editHandler(
      res,
      updateAndSaveDoc.bind(this, req.params.id, Comment, handleLike),
      errorMessage
    );
  },
  sortComments: async (req, res) => {
    //id = the id of the page the comments are for
    const { sortType, id } = req.params;

    try {
      const comments = await Comment.find({ pageId: id }).select('-__v');
      let sortedComments = [];

      switch (sortType) {
        case 'newest':
          //newest to oldest
          sortedComments = comments.sort((a, b) => b.date - a.date);
          break;

        case 'oldest':
          //oldest to newest
          sortedComments = comments.sort((a, b) => a.date - b.date);
          break;

        case 'top':
          //most likes
          sortedComments = comments.sort((a, b) => b.likes - a.likes);
          break;

        default:
          //default is newest to oldest
          sortedComments = comments.sort((a, b) => b.date - a.date);
          break;
      }

      const commentList = buildCommentList(sortedComments);

      res.json(commentList);
    } catch (error) {
      res.status(400).json({ msg: 'Error sorting comments' });
    }
  },
};
