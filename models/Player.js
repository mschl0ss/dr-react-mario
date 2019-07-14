const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//By convention, model files in Mongoose are singular and start with a capital letter
const PlayerSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    won: Boolean,
    score: Number,
})


// Let's not forget to export our model:
module.exports = Player = mongoose.model('players', PlayerSchema);