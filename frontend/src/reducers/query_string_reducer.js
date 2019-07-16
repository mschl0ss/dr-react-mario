import { RECEIVE_QUERY_STRING,CLEAR_QUERY_STRING } from '../actions/game_search_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_QUERY_STRING:
            return action.query;
        case CLEAR_QUERY_STRING:
            return {};
        default:
            return state;
    }
}