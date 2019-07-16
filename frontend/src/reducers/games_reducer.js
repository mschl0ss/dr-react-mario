import { RECEIVE_GAMES} from '../actions/game_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GAMES:
            return action.games.data.games
        default:
            return state;
    }
}