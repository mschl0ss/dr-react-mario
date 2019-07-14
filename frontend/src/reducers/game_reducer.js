import { RECEIVE_GAME, CLEAR_GAME } from '../actions/game_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GAME:
            return action.game.data;
        case CLEAR_GAME:
            return {id: '', name: '', players: [], seedValues:[]};
        default:
            return state;
    }
}