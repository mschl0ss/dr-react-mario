import React from 'react';
import {connect} from 'react-redux';

import GameFormContainer from '../game/game_form_container';
import GameContainer from '../game/game_container';
import DetailsWidget from '../../components/main/details_widget';
import Curtain from './curtain';

const msp = state => ({
    activeGame: state.ui.activeGame
})

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeGame:false,
            

        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeGame !== this.props.activeGame) {
            this.setState({activeGame: this.props.activeGame})
        }
    }

    render() {
        return (
            <>
            <div className="mask"></div>
            <div className="main-wrapper">
                <header>
                    <div className="logo">
                        <h1>dr-react-mario</h1>
                        <div className="left-pill"></div>
                        <div className="right-pill"></div>
                     </div>
                     {/* <div className="mask"></div> */}
                </header>
                <div className="main">
                    
                    <aside className="main-left">
                        <h3>Multiplayer</h3>
                        <GameFormContainer />
                    </aside>
                    
                    <section className="game-container">

                            <h3>play the game</h3>
                            <div className="game-board">
                                {/* <figure>
                                    <img src="board-mock.png" alt="board wireframe"/>
                                </figure> */}
                                {/* { this.state.activeGame === true ? <div>game</div>: <Curtain />} */}
                                { this.state.activeGame === true ? <GameContainer /> : <Curtain />}
                               


                            </div>
                    </section>

                    <aside className="main-right">
                       <DetailsWidget />
                    </aside>
                    

                </div>
            </div>
            </>
        )
    }
}

export default connect(msp)(Main);