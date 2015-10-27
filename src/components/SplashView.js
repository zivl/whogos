/**
 * SplashView options:
 *
 */
import React from 'react';
import FacebookAPI from '../modules/FacebookAPI';
import { history } from 'react-router/lib/BrowserHistory';

import '../../style/splash.scss';

class SplashView extends React.Component {

    constructor(props) {
        super(props);
        //var delay = new Promise(resolve => setTimeout(resolve, 1000000));
        //FacebookAPI.silentLogin({
        //    success: () => delay.then(() => history.pushState({}, '/whogos/events')),
        //    loginRequired: () => delay.then(() => history.pushState({}, '/whogos/login'))
        //})
    }

    render() {
        return (
            <div className='splash-screen'><div className='splash-animation'></div></div>
        );
    }
}

export default SplashView;