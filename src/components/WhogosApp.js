import React from 'react';

export default class WhogosApp extends React.Component {

    state = {
        todos: [],
        activeItems: 0
    }

    render() {
        return (
            <div className='app'>
                <h1>Hello World</h1>
            </div>
        );
    }
}
