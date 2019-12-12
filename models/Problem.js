const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Problem = new Schema({
    problem_index: {
        type: String
    },
    problem_info: {
        type: String
    },
    problem_answer: {
        type: String
    },
    problem_year:{
        type: String
    },
}
);
module.exports = mongoose.model('Problem', Problem);