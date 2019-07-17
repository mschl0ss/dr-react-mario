import {GAME_RUNNING} from '../../actions/ui_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case GAME_RUNNING:
            return action.running
        default:
            return state;
    }
}