import { connect } from 'react-redux';
import GameIndex from './game_index';
import {fetchGame, fetchGames, clearGames} from '../../actions/game_actions';

const msp = state => ({
    games: state.games,
    filteredGames: state.filteredGames,
    queryString: state.queryString
})

const mdp = dispatch => ({
    fetchGames: () => dispatch(fetchGames()),
    clearGames: () => dispatch(clearGames()),
    fetchGame: name => dispatch(fetchGame(name)),
})

export default connect(msp,mdp)(GameIndex);