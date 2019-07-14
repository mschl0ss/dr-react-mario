import { connect } from 'react-redux';
import Main from './main';
import { fetchGame, createGame, joinGame } from '../../actions/game_actions';

const msp = state => {
    // console.log(state);
    return ({
        game: state.game,
        id: state.game.id,
    })
};

const mdp = dispatch => ({
    fetchGame: name => dispatch(fetchGame(name)),
    createGame: (name,player) => dispatch(createGame(name,player)),
    joinGame: (name,player) => dispatch(joinGame(name,player)),
});

export default connect(msp,mdp)(Main);