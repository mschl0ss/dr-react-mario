import React from 'react';
import GameFormContainer from '../game/game_form_container';
import DetailsWidget from '../../components/main/details_widget';


class Main extends React.Component {


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
                                <figure>
                                    <img src="board-mock.png" />
                                </figure>
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

export default Main;