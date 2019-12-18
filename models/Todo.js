const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_createdAt:{
        type:Date, default:Date.now
    },
},{
     toObject:{virtuals:true} // 4

    // todo_completed: {
    //     type: Boolean
    // }
});
// virtuals // 3
Todo.virtual("createdDate")
.get(function(){
  return getDate(this.createdAt);
});

Todo.virtual("createdTime")
.get(function(){
  return getTime(this.createdAt);
});

Todo.virtual("updatedDate")
.get(function(){
  return getDate(this.updatedAt);
});

Todo.virtual("updatedTime")
.get(function(){
  return getTime(this.updatedAt);
});

// functions
function getDate(dateObj){
    if(dateObj instanceof Date)
      return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1)+ "-" + get2digits(dateObj.getDate());
  }
  
  function getTime(dateObj){
    if(dateObj instanceof Date)
      return get2digits(dateObj.getHours()) + ":" + get2digits(dateObj.getMinutes())+ ":" + get2digits(dateObj.getSeconds());
  }
  
  function get2digits(num){
    return ("0" + num).slice(-2);
  }

  module.exports = mongoose.model('Todo', Todo);