import mongoose from 'mongoose';
const {Schema}= mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('User', userSchema);