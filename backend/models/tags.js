const mongoose = require('mongoose');
const tagSchema = mongoose.Schema({
  name:  {type: String, require: true},
  tags: {type: [{name: String}], default: []}
 } )

module.exports = mongoose.model('Tag',tagSchema);
