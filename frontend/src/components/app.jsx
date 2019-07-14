import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import MainPage from './main/main_container';

const App = () => (
    <Switch>
        <Route exact path="/" component={MainPage} />
    </Switch>
);

export default App;