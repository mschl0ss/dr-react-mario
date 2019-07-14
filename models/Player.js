const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    won: Boolean,
    score: Number,
})


// Let's not forget to export our model:
module.exports = Player = PlayerSchema;