import * as gameUtil from '../utils/game_util';

export const RECEIVE_GAME = 'RECEIVE_GAME';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const DELETE_GAME = 'DELETE_GAME';
export const CLEAR_GAMES = 'CLEAR_GAMES';
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
export const CLEAR_GAMES_ERRORS = 'CLEAR_GAMES_ERRORS';


export const receiveGame = game => ({
    type: RECEIVE_GAME,
    game
})

export const receiveGames = games => ({
    type: RECEIVE_GAMES,
    games
})

export const deleteGameAction = game => {
    return ({
    type: DELETE_GAME,
    game
})}
export const clearGames = () => ({
    type: CLEAR_GAMES
})

export const receiveGameErrors = errors => ({
    type: RECEIVE_GAME_ERRORS,
    errors
})

export const clearGamesErrors = () => ({
    type: CLEAR_GAMES_ERRORS
})

export const fetchGame = name => dispatch => (
    gameUtil.getGame(name)
        .then(game => dispatch(receiveGame(game)),
        err => (dispatch(receiveGameErrors(err.response.data))))
        
)

export const fetchGames = () => dispatch => (
    gameUtil.getGames()
        .then(games => dispatch(receiveGames(games)),
            err => console.log(err))
)

export const createGame = (name, player, virusLevel, difficulty) => dispatch => (
    gameUtil.createGame(name, player,virusLevel, difficulty)
        .then(game => dispatch(receiveGame(game)),
        err => (dispatch(receiveGameErrors(err.response.data))))
)

export const joinGame = (name, player) => dispatch => (
    gameUtil.joinGame(name, player)
        .then(game => dispatch(receiveGame(game)),
        err => (dispatch(receiveGameErrors(err.response.data))))
)

export const deleteGame = name => dispatch => {
    // debugger;
    return (
    gameUtil.deleteGame(name)
        .then(game => dispatch(deleteGameAction(game)),
        // err => (dispatch(receiveGameErrors(err.response.data))))
        err => (console.log('error')))
)}