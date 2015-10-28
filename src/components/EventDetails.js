import React from 'react';
import ReactDOM from 'react-dom';
import FacebookAPI from '../modules/FacebookAPI';
import Header from './Header';
import { history } from 'react-router/lib/BrowserHistory';

import '../../style/eventdetails.scss';

export default class EventDetails extends React.Component {

    state = {
        loaded: false,
        amIAttending: null
    }

    componentWillMount() {
        FacebookAPI.getEventDetails(this.props.params.eventId, {
            success: data => this.setState({...data, loaded: true})
        });
        FacebookAPI.getEventStatus(this.props.params.eventId, {
        	success: amIAttending => this.setState({ amIAttending })
        });
    }

    render() {
        return (
            <div>
                <Header>
                    <span className='right-button' onClick={this.handleBack}>Back</span>
                </Header>
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
        var dateString = new Date(this.state.start_time).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            hour12: false
        });
        return (
            <div className='event-details-wrapper'>
                {
                    this.state.cover &&
                    <img src={this.state.cover.source}/>
                }
                <div className='event-details'>
                    <div className='event-name'>{ this.state.name }</div>
                    <div className='line-separator'></div>
                    <div className='event-date side-icon'>{ dateString }</div>
                    {
                        this.state.place &&
                        <div className='event-details-place side-icon'>
                            <div className='place-name'>{ this.state.place.name }</div>
                            {
                            	this.state.place.location &&
	                            <div className='place-address'>
	                                { this.state.place.location.street }
	                                { this.state.place.location.city }
	                            </div>
                            }
                        </div>
                    }
                    <div className='event-description side-icon'>{ this.state.description }</div>
                    <div className='people-going side-icon'>
                        <div className='stupid-padding-in-2am'></div>
	                        <span className='people-going-count'>
	                        {
	                        	this.state.amIAttending ?
	                        	`I and ${ this.state.attending_count-1 } people ` :
	                        	`${ this.state.attending_count } people `
		                    }
		                    </span>
                        	are going
                    </div>
                    {
                    	(this.state.amIAttending === false) &&
	                    <div className='button-wrapper'>
	                        <button className='going-button' onClick={this.handleJoinEvent}>I'm Going!</button>
	                    </div>
	                }
                </div>
            </div>
        );
    }


    handleJoinEvent = () => {
    	this.setState({ amIAttending: null })
        FacebookAPI.joinEvent(this.state.id, {
        	success: () => this.setState({ amIAttending: true }),
        	error: () => this.setState({ amIAttending: false })
        });
    }

    handleBack = () => {
    	history.back();
    }

}