
import { combineReducers } from 'redux';
import gameReducer from './game_reducer';

const RootReducer = combineReducers({
    game: gameReducer,
});

export default RootReducer;