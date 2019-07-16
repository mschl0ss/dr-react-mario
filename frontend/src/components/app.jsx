import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameFormContainer from './game/game_form_container';
import GameIndexContainer from './game/game_index_container';
import Board from './board/board';
import Game from './game/game';
import GameContainer from './game/game_container';
import Main from './main/main';

const App = () => (
    <Switch>
        <Route exact path="/games/form" component={GameFormContainer} />
        <Route exact path="/games/" component={GameIndexContainer} />
        <Route exact path="/games/test" component={GameContainer} />
        <Route exact path="/games/board" component={Board} />
        <Route exact path="/games/game" component={GameContainer} />
        <Route path = "/" component={Main} />
    </Switch>
);

export default App;