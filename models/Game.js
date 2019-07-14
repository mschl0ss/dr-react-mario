const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import Player from './Player';
// const player = require('./Player');

const PlayerSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    won: Boolean,
    score: Number,
})
//By convention, model files in Mongoose are singular and start with a capital letter
const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now },
    players: [PlayerSchema]

})


// Let's not forget to export our model:
module.exports = Game = mongoose.model('games', GameSchema);