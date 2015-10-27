import React from 'react';

import '../../style/header.scss';

class Header extends React.Component {

	static propTypes = {};

	static defaultProps = {
        title: 'WhoGoes'
    };

	render() {
		return (
			<div className='header'>
                <div className='header-title'>{this.props.title}</div>
                {this.props.children}
            </div>
		);
	}
}

export default Header; 