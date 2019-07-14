const express = require("express");
const router  = express.Router();
const Game = require('../../models/Game');

const Prando = require('prando');


router.get('/', (req, res) => {

    Game.findOne({name: req.body.name})
    .then(game => {
        if(game) {
            res.json({
                name: game.name,
                seed: game.id
            })
        }
        else {
            return res.status(418).json({ name: "No game exists" })
        }

    })
})

router.post('/', (req,res) => {
    const newGame = new Game({
        name: req.body.name
    })

    newGame
        .save()
        .then(game => {

            res.json({
                name: game.name,
                seed: game.id
            })
        })
        .catch(err=> console.log(err));
})

module.exports = router;