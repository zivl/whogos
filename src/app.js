import '../style/whogos.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import WhogosApp from './components/WhogosApp';

import EventsList from './components/EventsList';

import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';


ReactDOM.render(
    (
        <Router history={history}>
            <Route path="/whogos" component={WhogosApp}>
                <Route path="events-list" component={EventsList}/>
            </Route>
            <Redirect from="*" to="/whogos/events-list"/>
        </Router>
    )
    , document.getElementById('app'));
