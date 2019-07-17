import React from 'react';
import {connect} from 'react-redux';
import 
    {fetchGame, fetchGames, deleteGame,clearGames,} 
    from '../../actions/game_actions';
import { isGameActive } from '../../actions/ui_actions';

const msp = state => ({
    game: state.game,
    score: state.ui.score,
    activeGame: state.ui.activeGame,
    gameRunning: state.ui.gameRunning,
})

const mdp = dispatch => ({
    fetchGame: name => dispatch(fetchGame(name)),
    fetchGames: () => dispatch(fetchGames()),
    deleteGame: name => dispatch(deleteGame(name)),
    clearGames: () => dispatch(clearGames()),
    isGameActive: bool => dispatch(isGameActive(bool))
})

class ActiveGameInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            score: this.props.score,
            gameRunning: true,
        }
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.score !== this.props.score) {
            this.setState({score: this.props.score})
        }
    }
    handleDeleteSubmit(e) {
        e.preventDefault();
        
        this.props.deleteGame(this.props.game.name);
        this.props.clearGames();
        this.props.fetchGames();
        this.props.isGameActive(false);
    }
    render() {

        const score = this.props.score;
        const colorStyle = score > 20 ? {color: "rgb(229,3,1"} :
            score < 10 ? { color: "rgb(76, 174, 80)" } : {}
        const title = this.props.gameRunning ? 
            ``  :
            score > 0 ? `game over!` :
             `you win`
        
        return(
            <form className="info" onSubmit={this.handleDeleteSubmit}>
                <h1 style={colorStyle}>{title}</h1>

                <h4>
                    <span style={colorStyle}>{score} </span>
                     remaining!
                </h4>

                <button className="end" onClick={this.handleDeleteSubmit}>end game</button>
            </form>
        )
    }
}

export default connect(msp,mdp)(ActiveGameInfo);