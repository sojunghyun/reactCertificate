const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    user_id: {
        type: String
    },
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_provider:{
        type: String
    },
}
);
module.exports = mongoose.model('User', User);