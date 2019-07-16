import { connect } from 'react-redux';
import GameForm from './game_form';
import { fetchGame,fetchGames, createGame, deleteGame,
     joinGame, clearGames, clearGamesErrors } from '../../actions/game_actions';
import {
        receiveFilteredGames, 
        receiveQueryString, 
        clearQueryString
        } from '../../actions/game_search_actions';
import { isGameActive } from '../../actions/ui_actions';

const msp = state => {
    return ({
        game: state.game,
        games: state.games,
        errors: Object.values(state.errors)
    })
};

const mdp = dispatch => ({
    fetchGame: name => dispatch(fetchGame(name)),
    fetchGames: () => dispatch(fetchGames()),
    createGame: (name, virusLevel, difficulty, player) => dispatch(createGame(name, virusLevel, difficulty, player)),
    joinGame: (name,player) => dispatch(joinGame(name,player)),
    deleteGame: name => dispatch(deleteGame(name)),
    clearGames: () => dispatch(clearGames()),
    clearGamesErrors: () => dispatch(clearGamesErrors()),
    receiveFilteredGames: games => dispatch(receiveFilteredGames(games)),
    receiveQueryString: query => dispatch(receiveQueryString(query)),
    clearQueryString: () => dispatch(clearQueryString()),
    isGameActive: bool => dispatch(isGameActive(bool))
});

export default connect(msp,mdp)(GameForm);