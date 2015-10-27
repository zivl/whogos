import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default class WhogosApp extends React.Component {

    state = {
        todos: [],
        activeItems: 0
    }

    render() {
        return (
            <div className='app'>
                <Header />
                <div className="app-body">
                    <h1>Hello World</h1>
                    Some text here
                </div>
                <Footer />
            </div>
        );
    }
}
