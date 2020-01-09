const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserInfo = new Schema({
    user_email: {
        type: String
    },
    user_name: {
        type: String
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