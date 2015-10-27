import '../style/whogos.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import WhogosApp from './components/WhogosApp';

import Splash from './components/SplashView';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import LoginView from './components/LoginView';

import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';


ReactDOM.render(
    (
        <Router history={history}>
            <Route path="/whogos" component={WhogosApp}>
                <Route path="splash" component={Splash}/>
                <Route path="login" component={LoginView}/>
                <Route path="events" component={EventsList}>
                    <Route path=":eventId" component={EventDetails}/>
                </Route>
            </Route>
            <Redirect from="*" to="/whogos/splash"/>
        </Router>
    )
    , document.getElementById('app'));
