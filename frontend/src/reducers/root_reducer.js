
import { combineReducers } from 'redux';
import game from './game_reducer';
import games from './games_reducer';
import filteredGames from './filtered_games_reducer';
import queryString from './query_string_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
    game,
    games,
    filteredGames,
    queryString,
    errors,
});

export default RootReducer;