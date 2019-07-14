
import { combineReducers } from 'redux';
import game from './game_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
    game,
    errors,
});

export default RootReducer;