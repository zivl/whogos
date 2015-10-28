import React from 'react';

import '../../style/header.scss';

class Header extends React.Component {

	static propTypes = {};

	static defaultProps = {
        title: 'Whogos'
    };

	render() {
		return (
			<div className='header'>
                <div className='header-logo'>
                    <div className='logo-animation'></div>
                </div>
                <div className='header-title'>{this.props.title}</div>
                {this.props.children}
            </div>
		);
	}
}

export default Header; 