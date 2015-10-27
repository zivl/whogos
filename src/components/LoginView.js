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
        var delay = new Promise(resolve => setTimeout(resolve, 2000));
        FacebookAPI.silentLogin({
            success: () => delay.then(() => history.pushState({}, '/whogos/events')),
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
                    <div className='login-text'>
                    {
                        this.state.showLogin && 
                        <div>
                            <div>Please login</div>
                            <div>with Facebook</div>
                            <button className='login-button' onClick={this.handleClick}>Take me There</button>
                        </div>
                    }
                    </div>
            </div>
        );
    }
}

export default LoginView;