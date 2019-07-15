const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'player name is required']
    },
    won: Boolean,
    score: Number,
})


// Let's not forget to export our model:
module.exports = Player = PlayerSchema;