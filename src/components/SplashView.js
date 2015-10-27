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

        var delay = new Promise(resolve => setTimeout(resolve, 4500));
        var getRoute = new Promise(resolve => {
            FacebookAPI.silentLogin({
               success: () => resolve('/whogos/events'),
               loginRequired: () => resolve('/whogos/login')
            });
        });

        delay.then(() => getRoute).then(route => history.pushState({}, route));
    }

    render() {
        return (
            <div className='splash-screen'>
                <div className='splash-animation'></div>
                <div className='splash-name'>
                    <span className='arrow left'></span>whogos<span className='arrow right'></span>
                </div>
            </div>
        );
    }
}

export default SplashView;