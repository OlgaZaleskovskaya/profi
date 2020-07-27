const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name:  {type: String, require: true},
  email: {type: String, require: true},
  password:  {type: String, require: true},
  userId: {type: String, require: true},
  role: {type: String, require: true},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User',postSchema);
