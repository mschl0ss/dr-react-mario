const express = require("express");

const router  = express.Router();
const Game = require('../../models/Game');

const Prando = require('prando');
const seedCount = 2000;

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

    //set up the basics.  we've just decided that total viruses === lvl * 3
    const colors = ['red', 'yellow', 'blue']
    const totalCount = 160;
    const virusCount = virusLevel * 3;


    //lets make an array and and push ${virusCount} 'viruses', which are just
    //color strings
    
    const virusSquares = [];
    
    for(let i=0; i<virusCount; i++) {
        virusSquares.push(colors[Math.floor(Math.random() * 3)]);
    }

    //now we need to fill the rest of the board with blank squares
    const blankSquares = [];

    for(let i=0; i<(totalCount-virusCount); i++) {
        blankSquares.push('blank');
    }

    //now we combine and shuffle the blank and virus arrays

    const topIsBlank = blankSquares.slice(0,65);
    const bottomHasViruses = shuffle(virusSquares.concat(blankSquares.slice(65)))
    const shuffledSquares = topIsBlank.concat(bottomHasViruses);

    const board = [];

    
    //k cool `shuffledSquares` is an array of the exact length and population
    //that we want for our board.  Now let's just loop around, create rows,
    //and add those rows to the board

    for (let row = 0; row < 20; row++) {
        const thisCol = [];
        for (let col = 0; col < 8; col++) {

            thisCol.push(shuffledSquares.shift());

        }
        
        board.push(thisCol);
    }

    // word.
    return board;
     
}
router.get('/all', (req,res) => {
    Game.find().then(games=>{
        const theGames = games.map(game => {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < seedCount; i++) seedValues.push(rng.nextInt(0, 9));
            
            return {
                name: game.name,
                id: game.id,
                players: game.players,
                difficulty: game.difficulty,
                virusLevel: game.virusLevel,
                initialState: generateInitialState(game.virusLevel),
                seedValues: seedValues,}
        })
        res.json({
            games: theGames
        })
    })
})

router.get('/', (req, res) => {
    const theName = req.query.name;
    Game.findOne({ name: { $regex: new RegExp(theName, "i") }})
    .then(game => {
       
        if(game) {
            let rng = new Prando(game.id);
            const seedValues = [];
            for (let i = 0; i < 5; i++) seedValues.push(rng.nextInt(0, 9));
            res.json({
                name: game.name,
                id: game.id,
                players: game.players,
                difficulty: game.difficulty,
                virusLevel: game.virusLevel,
                initialState: generateInitialState(game.virusLevel),
                seedValues: seedValues,
            })
        }
        else {
            return res.status(418).json({ fetchGame: ["Game not found"] })
        }

    })
})

router.post('/', (req,res) => {
    // debugger;
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
            for (let i = 0; i < seedCount; i++) seedValues.push(rng.nextInt(0, 9));
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
            // if(err.errors.name) outputErrors.push('please enter a game name');
            // if(err.message.includes('player name is required')) outputErrors.push('player name is required');
            // res.status(418).json({ createGame: outputErrors })
            res.status(418).json({ createGame: [err.message] })
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
                    for (let i = 0; i < seedCount; i++) seedValues.push(rng.nextInt(0, 9));
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
    // debugger;
    Game.findOneAndRemove( {name: req.body.name} )
        .then(game=> {
            
            if(game){
                res.json({
                    game: game,
                })
            }
            else {
                res.status(418).json({deleteGame: ["game not found"]})
            }
        })
        .catch(err => {
            res.status(420).json({ deleteGame: [err.message] })
            }
        );
})

module.exports = router;