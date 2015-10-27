/**
 * Created by omerp on 10/27/2015.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FaceBookAPI from '../modules/FacebookAPI';
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
        console.log(events);
        this.setState({events});
    }

    eventDetailsWrapper(eventId) {
        return () => {
            history.pushState({}, `/whogos/event/${eventId}`);
        };
    }

    renderEvent = (eventData) => {
        var description = eventData.description;
        var cover = eventData.cover;
        return (
            <div className="event-item" key={eventData.id} onClick={this.eventDetailsWrapper(eventData.id)}>
                <div className="image-wrapper">{cover && cover.source && <img src={cover.source} className="photo"/>}</div>
                <div className="name">{eventData.name}</div>
                <div className="description">{description && (description.substring(0, 50) + '...')}</div>
                <div className="end-date">{eventData['end_time']}</div>
                <div>{eventData['start_time']}</div>
                <div>{eventData.id}</div>
                <div>{eventData.rsvp_status}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="events-list">{this.state.events.map(this.renderEvent)}</div>
        );
    }
}