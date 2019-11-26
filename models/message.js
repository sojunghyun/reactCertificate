var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;