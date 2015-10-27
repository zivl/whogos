import React from 'react';

export default class WhogosApp extends React.Component {

    state = {
    }

    render() {
        return (
            <div className='app'>
                <div className="app-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
