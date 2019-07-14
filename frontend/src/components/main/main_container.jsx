import { connect } from 'react-redux';
import Main from './main';
import { fetchGame, createGame, joinGame, clearGame, clearGameErrors } from '../../actions/game_actions';

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
    clearGame: () => dispatch(clearGame()),
    clearGameErrors: () => dispatch(clearGameErrors())
});

export default connect(msp,mdp)(Main);