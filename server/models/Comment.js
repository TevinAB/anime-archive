const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the schema for comments
const commentSchema = new Schema({
  username: String,
  userPic: String,
  commentBody: String,
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: [Schema.Types.ObjectId],
  rootComment: String, // If this comment is a reply to another comment
  marginDepth: Number, // This is used to determine how much margin is applied when displaying comment
  pageId: String, //The page the comment belongs to
});

module.exports = Comment = mongoose.model('comment', commentSchema);
