const express = require("express");
const router  = express.Router();
const Game = require('../../models/Game');

const Prando = require('prando');


router.get('/', (req, res) => {
    // debugger;
    // Game.findOne({name: req.body.name})
    Game.findOne({name: req.query.name})
    .then(game => {
       
        if(game) {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 10; i++) seedValues.push(rng.nextInt(0,10));
            res.json({
                name: game.name,
                id: game.id,
                seedValues: seedValues,
                players: game.players,
            })
        }
        else {
            return res.status(418).json({ name: "No game exists" })
        }

    })
})

router.post('/', (req,res) => {
    // console.log('here')
    // debugger;
    const newGame = new Game({
        name: req.body.name,
        players: [{name: req.body.player}]
    })
    

    newGame
        .save()
        .then(game => {
            // debugger;
            res.json({
                name: game.name,
                id: game.id,
                players: game.players,
            })
        })
        .catch(err=> console.log(err));
})

router.patch('/', (req,res) => {
    
    Game.findOne({ name: req.body.name })
        .then(game => {
            if (game) {
                debugger;
                game.players.push({name: req.body.player});
                game.save()
                .then(game=>{
                    res.json({
                        name: game.name,
                        id: game.id,
                        players: game.players,
                    })
                })
                .catch(err => console.log(err)); 
            } else {
                return res.status(418).json({ name: "No game with that name" })
            }
        })
})

module.exports = router;