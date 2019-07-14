import React from 'react';
import ReactDOM from 'react-dom';

// We will create this component shortly
import Root from './components/root';

// We set this up in the last section
import configureStore from './store/store';

// We will use this to parse the user's session token
// import jwt_decode from 'jwt-decode';

// The session utility we just created
// import { setAuthToken } from './util/session_api_util';

// We have not created this action yet, but will do so in the next step
// import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore({});
    
    // Render our root component and pass in the store as a prop
    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});