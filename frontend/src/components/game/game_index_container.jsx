import { connect } from 'react-redux';
import GameIndex from './game_index';
import {fetchGames, clearGames} from '../../actions/game_actions';

const msp = state => ({
    games: state.game.games
})

const mdp = dispatch => ({
    fetchGames: () => dispatch(fetchGames()),
    clearGames: () => dispatch(clearGames()),
})

export default connect(msp,mdp)(GameIndex);