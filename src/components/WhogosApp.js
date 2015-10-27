import React from 'react';
import LoginView from './LoginView';


export default class WhogosApp extends React.Component {

    state = {
        todos: [],
        activeItems: 0
    }

    render() {
        return (
            <div className='app'>
                <h1><LoginView /></h1>
            </div>
        );
    }
}
