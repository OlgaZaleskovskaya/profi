const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
//  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, require: true },
  authorId: { type: String, require: true },
  content: { type: String, require: true },
  imageData:[{ path: String, width:Number, height: Number} ],
  tags: { type: [String], require: true },
  date: { type: Date, default: Date.now },
  comments: [{authorId: String, content: String, date: Date }]

});

module.exports = mongoose.model('Post', postSchema);


