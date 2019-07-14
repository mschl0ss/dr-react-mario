import { connect } from 'react-redux';
import GameForm from './game_form';
import { fetchGame, createGame, joinGame, clearGames, clearGamesErrors } from '../../actions/game_actions';

const msp = state => {
    return ({
        game: state.game,
        errors: Object.values(state.errors)
    })
};

const mdp = dispatch => ({
    fetchGame: name => dispatch(fetchGame(name)),
    createGame: (name,player) => dispatch(createGame(name,player)),
    joinGame: (name,player) => dispatch(joinGame(name,player)),
    clearGames: () => dispatch(clearGames()),
    clearGamesErrors: () => dispatch(clearGamesErrors())
});

export default connect(msp,mdp)(GameForm);