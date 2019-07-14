import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GameFormContainer from './game/game_form_container';
import GameIndexContainer from './game/game_index_container';

const App = () => (
    <Switch>
        <Route exact path="/games/form" component={GameFormContainer} />
        <Route exact path="/games/" component={GameIndexContainer} />
    </Switch>
);

export default App;