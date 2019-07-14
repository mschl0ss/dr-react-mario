import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GameFormContainer from './game/game_form_container';
import GameIndexContainer from './game/game_index_container';
import Game from './game/game'

const App = () => (
    <Switch>
        <Route exact path="/games/form" component={GameFormContainer} />
        <Route exact path="/games/" component={GameIndexContainer} />
        <Route exact path="/game/test/" component={Game} />
    </Switch>
);

export default App;