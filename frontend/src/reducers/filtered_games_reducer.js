import { RECEIVE_FILTERED_GAMES } from '../actions/game_search_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FILTERED_GAMES:
            return action.games
        default:
            return state;
    }
}