import { combineReducers } from 'redux';
import activeGame from './ui/active_game_reducer';
import score from './ui/score_reducer';
import running from './ui/running_reducer';
export default combineReducers({
    activeGame,
    score,
    gameRunning: running,
});