import * as gameUtil from '../utils/game_util';

export const RECEIVE_GAME = 'RECEIVE_GAME';

export const receiveGame = game => ({
    type: RECEIVE_GAME,
    game
})

export const fetchGame = name => dispatch => (
    gameUtil.getGame(name)
        .then(game => dispatch(receiveGame(game)))
)

export const createGame = (name, player) => dispatch => (
    gameUtil.createGame(name, player)
        .then(game => dispatch(receiveGame(game)))
)

export const joinGame = (name, player) => dispatch => (
    gameUtil.joinGame(name, player)
        .then(game => dispatch(receiveGame(game)))
)