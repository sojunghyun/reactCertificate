var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentschema = new Schema({
  title: {
    type: String,
  },
  username:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{
     toObject:{virtuals:true} // 4

    // todo_completed: {
    //     type: Boolean
    // }
});

module.exports = mongoose.model('commentschema', commentschema);