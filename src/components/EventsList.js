/**
 * Created by omerp on 10/27/2015.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FaceBookAPI from '../modules/FacebookAPI';
import Header from './Header';
import { history } from 'react-router/lib/BrowserHistory';
import '../../style/eventlist.scss';


export default class EventsList extends React.Component {

    state = {
        events: []
    }

    componentWillMount() {
        FaceBookAPI.getFriendsEvents({
            success: this.friendEventsSuccess
        });
    }

    friendEventsSuccess = events => {
        this.setState({events});
    }

    eventDetailsWrapper(eventId) {
        return () => {
            history.pushState({}, `/whogos/event/${eventId}`);
        };
    }

    renderEvent = (eventData) => {
        var picture = eventData.picture;
        var date = new Date(eventData.start_time);
        var dateString = date.toLocaleString('en-US', {month:'short', day: '2-digit', hour: '2-digit', minute:'2-digit', weekday:'long', hour12: false});
        return (
            <div className='event-item' key={eventData.id} onClick={this.eventDetailsWrapper(eventData.id)}>
                <div className='image-wrapper'>
                    {
                        picture && picture.data && picture.data.url &&
                        <img src={picture.data.url} className='photo'/>
                    }
                </div>
                <div className='event-desc'>
                    <div className='name truncate'>{eventData.name}</div>
                    <div className='date-time'>{dateString}</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Header>
                    <span className='filters'>Filters</span>
                </Header>
                <div className='events-list'>{this.state.events.map(this.renderEvent)}</div>
            </div>
        );
    }
}