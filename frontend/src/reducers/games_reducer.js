import { RECEIVE_GAMES, DELETE_GAME} from '../actions/game_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GAMES:
            return action.games.data.games
        case DELETE_GAME:
            return state.filter(game=> game.id !== action.game.data.game.id)
            // let newState = Object.assign({}, state);
            // debugger;
            // delete newState[action.game.data.game.id]
            // return newState;
        default:
            return state;
    }
}