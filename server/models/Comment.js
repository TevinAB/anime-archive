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
  likes: Number,
  replies: [],
  rootComment: String, // If this comment is a reply to another comment
  depth: Number, // This is used to determine how much margin is applied when displaying comment
});

module.exports = Comment = mongoose.model('comment', commentSchema);
