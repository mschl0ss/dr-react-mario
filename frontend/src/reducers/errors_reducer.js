import { RECEIVE_GAME_ERRORS, CLEAR_GAMES_ERRORS } from '../actions/game_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_GAME_ERRORS:
            return action.errors;
        case CLEAR_GAMES_ERRORS:
            return {};
        default:
            return state;
    }
}