import React from 'react';
import ReactDOM from 'react-dom';

import FacebookAPI from '../modules/FacebookAPI';
import Header from './Header';

export default class EventDetails extends React.Component {

	state = {
		loaded: false
	}

	componentWillMount() {
		FacebookAPI.getEventDetails(this.props.params.eventId, {
			success: data => this.setState({ ...data, loaded: true })
		});
	}

    render() {
    	return (
    		<div>
    			<Header />
    			{
    				this.state.loaded ? this.renderDetails() : this.renderLoader()
    			}
    		</div>
    	);
    }

    renderLoader() {
    	return (
    		<div className='loader'/>
    	);
    }

    renderDetails() {
    	console.log(this.state);
    	return (
    		<div className='event-details'>
    			{
    				this.state.cover &&
    				<img src={this.state.cover.source} />
    			}
    			<h1>{ this.state.name }</h1>
    			<div>{ this.state.description }</div>
    		</div>
    	);
    }

}