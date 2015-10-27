import React from 'react';


export default class WhogosApp extends React.Component {

    state = {
    }

    render() {
        return (
            <div className='app'>
                <LoginView />
                {this.props.children}
            </div>
        );
    }
}
