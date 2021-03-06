import {RECEIVE_SCORE} from '../../actions/ui_actions';

export default function (state = 0, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SCORE:
            return action.score
        default:
            return state;
    }
}