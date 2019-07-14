import { RECEIVE_GAME } from '../actions/game_actions';

export default function (state = {}, action) {
    Object.freeze(state);
        // debugger;
    switch (action.type) {
        case RECEIVE_GAME:
            return action.game.data;
        default:
            return state;
    }
}