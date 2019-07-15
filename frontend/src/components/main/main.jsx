import React from 'react';
import GameFormContainer from '../game/game_form_container';
import GameIndexContainer from '../game/game_index_container';

// import styles from '../../assets/stylesheets/main/main'


class Main extends React.Component {





    render() {
        return (
            <div id="main-wrapper">
                <header>
                    <h1>dr-react-mario</h1>
                </header>
                <div id="main">
                    <aside className="left">
                        <h3>Multiplayer</h3>
                        <GameFormContainer />
                    </aside>
                    <section>

                    </section>

                    <aside className="right">
                        <h3>Controls</h3>
                    </aside>
                </div>
            </div>
        )
    }
}

export default Main;