const express = require("express");

const router  = express.Router();
const Game = require('../../models/Game');

const Prando = require('prando');

debugger;
router.get('/all', (req,res) => {
    Game.find().then(games=>{
        const theGames = games.map(game => {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 30; i++) seedValues.push(rng.nextInt(0, 30));
            
            return {name: game.name, _id: game.id, players: game.players, seedValues}
        })
        res.json({
            games: theGames
        })
    })
})
router.get('/', (req, res) => {
    Game.findOne({name: req.query.name})
    .then(game => {
       
        if(game) {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 30; i++) seedValues.push(rng.nextInt(0, 30));
            res.json({
                name: game.name,
                id: game.id,
                seedValues: seedValues,
                players: game.players,
            })
        }
        else {
            return res.status(418).json({ fetchGame: ["Game not found"] })
        }

    })
})

router.post('/', (req,res) => {
    const newGame = new Game({
        name: req.body.name,
        players: [{name: req.body.player}]
    })
    

    newGame
        .save()
        .then(game => {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 30; i++) seedValues.push(rng.nextInt(0, 30));
            res.json({
                name: game.name,
                id: game.id,
                players: game.players,
                seedValues: seedValues,
            })
        })
        .catch(err => {
            // debugger;
            const outputErrors = [];
            if(err.errors.name) outputErrors.push('please enter a game name');
            if(err.message.includes('player name is required')) outputErrors.push('player name is required');
            res.status(418).json({ createGame: outputErrors })
            // res.status(418).json({ createGame: err.message })
            }
        );
})

router.patch('/', (req,res) => {
    
    Game.findOne({ name: req.body.name })
        .then(game => {
            if (game) {
                game.players.push({name: req.body.player});
                game.save()
                .then(game=>{
                    let rng = new Prando(game.id);
                    const seedValues = [];
                    for (let i = 0; i < 30; i++) seedValues.push(rng.nextInt(0, 30));
                    res.json({
                        name: game.name,
                        id: game.id,
                        players: game.players,
                        seedValues: seedValues,
                    })
                })
            .catch(err => res.status(418).json({ joinGame: ["Two players max"] }));
            } else {
                return res.status(418).json({ fetchGame: ["Game not found"] })
            }
        })
})

router.delete('/', (req,res) => {


})

module.exports = router;