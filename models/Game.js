const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import Player from './Player';
const Player = require('./Player');

function twoPlayerLimit(players) {
    return players.length <= 2;
}

//By convention, model files in Mongoose are singular and start with a capital letter
const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    players: {
        type: [Player],
        validate: [twoPlayerLimit, 'Cant have more than 2 players']
        },
    created_at: { type: Date, default: Date.now },

})

// Let's not forget to export our model:
module.exports = Game = mongoose.model('games', GameSchema);
// module.exports = Player = mongoose.model('players', PlayerSchema);