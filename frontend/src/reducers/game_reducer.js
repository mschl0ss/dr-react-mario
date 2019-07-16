import { RECEIVE_GAME, CLEAR_GAMES, DELETE_GAME } from '../actions/game_actions';

export default function (state = {}, action) {
    // debugger;
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GAME:
            return action.game.data;
        case CLEAR_GAMES:
            return {id: '', name: '', players: [], seedValues:[]};
        case DELETE_GAME:
            
            let newState = Object.assign({}, state);
            delete newState[applicationCache.game.data.game.id]
            return newState;
        default:
            return state;
    }
}