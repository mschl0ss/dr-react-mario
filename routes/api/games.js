const express = require("express");

const router  = express.Router();
const Game = require('../../models/Game');

const Prando = require('prando');

// debugger;

function guidGenerator() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function generateInitialState(virusLevel) {
    const colors = ['red', 'yellow', 'blue']
    const totalCount = 160;


    const virusSquares = [];
    const virusCount = virusLevel * 3;
    
    for(let i=0; i<virusCount; i++) {
        virusSquares.push(colors[Math.floor(Math.random() * 3)]);
    }

    const blankSquares = [];

    for(let i=0; i<(totalCount-virusCount); i++) {
        blankSquares.push('blank');
    }

    const allSquares = virusSquares.concat(blankSquares);
    const shuffledSquares = shuffle(allSquares);

    const usedPicks = [];
    const board = [];

    const usedPicks = [];
    const board = [];
    // debugger;
    for (let col = 0; col < 8; col++) {
        const thisRow = [];
        for (let row = 0; row < 20; row++) {

            let pick = Math.floor(Math.random() * 16);
            while (usedPicks.includes(pick)) {
                pick = Math.floor(Math.random() * 160);

            }
            if (!shuffledSquares[pick]) {
                // debugger;
            }
            usedPicks.push(pick);
            thisRow.push(shuffledSquares[pick]);
        }
        // console.log(`pushing ${thisRow} into board: ${board}`)
        board.push(thisRow);
    }
    // debugger;
    return board;
     
}
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
        virusLevel: req.body.virusLevel,
        difficulty: req.body.difficulty,
        players: [{name: req.body.player}]
    })
    
    
    newGame
        .save()
        .then(game => {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 100; i++) seedValues.push(rng.nextInt(0, 9));
            res.json({
                name: game.name,
                id: game.id,
                players: game.players,
                difficulty: game.difficulty,
                virusLevel: game.virusLevel,
                initialState: generateInitialState(game.virusLevel),
                seedValues: seedValues,
            })
        })
        .catch(err => {
            // debugger;
            const outputErrors = [];
            if(err.errors.name) outputErrors.push('please enter a game name');
            if(err.message.includes('player name is required')) outputErrors.push('player name is required');
            // res.status(418).json({ createGame: outputErrors })
            res.status(418).json({ createGame: err.message })
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