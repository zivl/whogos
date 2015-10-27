import React from 'react';

import Header from './Header';
import Footer from './Footer';


export default class WhogosApp extends React.Component {

    state = {
    }

    render() {
        return (
            <div className='app'>
                <Header />
                <div className="app-body">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
