/**
 * LoginView options:
 *
 */
import React from 'react';
import FacebookAPI from '../modules/FacebookAPI';
import { history } from 'react-router/lib/BrowserHistory';

import '../../style/login.scss';

class LoginView extends React.Component {

    static propTypes = {}
    static defaultProps = {}


    handleClick = () => {
        FacebookAPI.login({
            success: () => history.pushState({}, '/whogos/events')
        });
    }

    render() {
        return (
            <div className='login-view'>
                <div className='login-logo'></div>
                <div className='login-text'>
                    <div>Please login</div>
                    <div>with Facebook</div>
                    <button className='login-button' onClick={this.handleClick}>Yeh, log me in!</button>
                </div>
            </div>
        );
    }
}

export default LoginView;