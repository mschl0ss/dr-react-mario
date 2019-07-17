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
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            gameActive: this.props.gameActive,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props) {
            this.setState({ gameActive: this.props.gameActive, game: this.props.game})
        }
        if(this.state.gameActive === true && this.props.game.id !== "" ) {
            this.props.isGameActive(true);
        }
    }

    startBlankGame() {
        debugger;
        this.setState({gameActive: true});
        const randomGame = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();
        const randomPlayer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15).toString();

        const gameName = this.props.game.name.length ? this.props.game.name : randomGame;
        const virusLevel = this.props.game.virusLevel ? this.props.game.virusLevel : 10;
        const difficulty = this.props.game.difficulty ? this.props.game.difficulty : 'medium';
        const playerName = this.props.game.players.length ? this.props.game.player : randomPlayer;
        
        if (this.props.game.id === "" ) this.props.createGame(gameName, virusLevel, difficulty, playerName);

        
    }
    
    renderVirusRow(){
        const styles = ["pixel virus red red-border", "pixel virus blue blue-border", "pixel virus yellow yellow-border"]
        const row=[];

        for(let i=0;i<8;i++){
            row.push(
                <div className={styles[i%3]}>
                    <div className="eyes">
                        <div></div>
                        <div></div>
                    </div>
                    <div className="mouth"></div>
                </div>
            )
        }
        
        
        return row;
    }

    render() {
        console.log(this.props)
        return (
            <div className="curtain">
                <p>set options on the left and then hit the big blue button to begin</p>

                <div className="virus-row">
                    {this.renderVirusRow()}
                </div>
                    {/* <button onClick={() => this.startBlankGame()}>start game</button> */}

               
            </div>
        )
    }
}

export default connect(msp, mdp)(Curtain)