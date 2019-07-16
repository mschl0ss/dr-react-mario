import React from 'react';
import GameFormContainer from '../game/game_form_container';
import DetailsWidget from '../../components/main/details_widget';


class Main extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         keyPresses : {
    //             left: 0,
    //         }
            

    //     }
    // }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.keyPresses !== this.props.keyPresses) {
    //         //check which key changed
    //         //if left send the hardcoded keycode for left to the handle key press event
    //     }
    // }
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
                                    <img src="board-mock.png" alt="board wireframe"/>
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