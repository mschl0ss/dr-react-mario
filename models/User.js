const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//By convention, model files in Mongoose are singular and start with a capital letter
const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


// Let's not forget to export our model:
module.exports = User = mongoose.model('users', UserSchema);