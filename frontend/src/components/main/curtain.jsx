import { connect } from 'react-redux';
import React from 'react';
import {createGame} from '../../actions/game_actions';
import {isGameActive} from '../../actions/ui_actions';

const msp = state => ({
    gameActive: state.ui.gameActive,
    game: state.game
})

const mdp = dispatch => ({
    createGame: (name, virusLevel, difficulty, player) => dispatch(createGame(name, virusLevel, difficulty, player)),
    isGameActive: (bool) => dispatch(isGameActive(bool))
})

class Curtain extends React.Component {

    componentDidUpdate(prevProps){
        if(prevProps !== this.props) {
            this.setState({ gameActive: this.props.gameActive, game: this.props.game})
        }
    }

    startBlankGame() {
        this.props.isGameActive(true);
        const randomGame = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();
        const randomPlayer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();

        const gameName = this.props.game.name.length ? this.props.game.name : randomGame;
        const virusLevel = this.props.game.virusLevel ? this.props.game.virusLevel : 10;
        const difficulty = this.props.game.difficulty ? this.props.game.difficulty : 'medium';
        const playerName = this.props.game.players.length ? this.props.game.player : randomPlayer;
        
        if (this.props.game.id === "" ) this.props.createGame(gameName, virusLevel, difficulty, playerName);

        
}

    render() {
        console.log(this.props)
        return (
            <div>
                <p>set options on the left and then hit</p>

                    <button onClick={() => this.startBlankGame()}>start game</button>

                <p>to begin!</p>
            </div>
        )
    }
}

export default connect(msp, mdp)(Curtain)