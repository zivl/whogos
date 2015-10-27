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

    state = {
        showLogin: false
    }

    constructor(props) {
        super(props);
        FacebookAPI.silentLogin({
            success: () => history.pushState({}, '/whogos/events'),
            loginRequired: () => this.setState({ showLogin: true })
        })
    }

    handleClick = () => {
        FacebookAPI.login({
            success: () => history.pushState({}, '/whogos/events')
        });
    }

    render() {
        return (
            <div className='login-view'>
                <div className='login-logo'></div>
                {
                    this.state.showLogin &&
                    <div className='login-text'>
                        <div>Please login</div>
                        <div>with Facebook</div>
                        <button className='login-button' onClick={this.handleClick}>Take me There</button>
                    </div>
                }
            </div>
        );
    }
}

export default LoginView;