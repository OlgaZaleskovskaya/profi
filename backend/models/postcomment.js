const mongoose = require('mongoose');
const postcommentSchema = mongoose.Schema({
  postId: { type: String, require: true },
  comments: [{authorId: String, content: String, date: Date }],
});

module.exports = mongoose.model('Comment', postcommentSchema);
