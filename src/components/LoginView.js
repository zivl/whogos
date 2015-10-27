/**
 * LoginView options:
 *
 */
import React from 'react';

class LoginView extends React.Component {

    componentDidMount() {

    }

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
            console.log('Successful login for: ' + response.name);

        });
    }

// This is called with the results from from FB.getLoginStatus().
    statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log into Facebook.';
        }
    }

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
    checkLoginState = () => {
        FB.getLoginStatus((response) => {
            this.statusChangeCallback(response);
        });
    }

    handleClick = () => {
        window.fbReady.then(() => {
            FB.login(this.statusChangeCallback, {scope: 'user_about_me,user_friends,user_events,email'});
        });
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClick}>Login</a>
            </div>
        );
    }
}

LoginView.defaultProps = {};
LoginView.propTypes = {};

export default LoginView;