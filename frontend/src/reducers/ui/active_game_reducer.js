import {ACTIVE_GAME} from '../../actions/ui_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case ACTIVE_GAME:
            return action.bool
        default:
            return state;
    }
}