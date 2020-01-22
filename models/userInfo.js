const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserInfo = new Schema({
    user_email: {
        type: String, required: true, unique: true, lowercase: true
    },
    user_name: {
        type: String, required: true
    },
    user_password: {
        type: String
    },
    user_birthday: {
        type: Date
    }
}
);
module.exports = mongoose.model('UserInfo', UserInfo);